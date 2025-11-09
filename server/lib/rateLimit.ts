import { getDb } from "../db";
import { contactFormRateLimits } from "../../drizzle/schema";
import { eq, lt } from "drizzle-orm";

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_SUBMISSIONS_PER_WINDOW = 3;

/**
 * Check if an IP address has exceeded the rate limit
 * @param ipAddress - The IP address to check
 * @returns Object with isAllowed flag and remaining submissions
 */
export async function checkRateLimit(ipAddress: string): Promise<{
  isAllowed: boolean;
  remaining: number;
  resetTime: Date | null;
}> {
  try {
    const db = await getDb();
    if (!db) {
      // Database not available - fail open (allow request)
      return {
        isAllowed: true,
        remaining: MAX_SUBMISSIONS_PER_WINDOW,
        resetTime: null,
      };
    }

    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

    // Find existing rate limit record for this IP
    const existingRecords = await db
      .select()
      .from(contactFormRateLimits)
      .where(eq(contactFormRateLimits.ipAddress, ipAddress))
      .limit(1);

    if (existingRecords.length === 0) {
      // No record exists - this is the first submission
      return {
        isAllowed: true,
        remaining: MAX_SUBMISSIONS_PER_WINDOW - 1,
        resetTime: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS),
      };
    }

    const record = existingRecords[0];
    const recordWindowStart = new Date(record.windowStart);

    // Check if the current window has expired
    if (recordWindowStart < windowStart) {
      // Window has expired - reset the counter
      return {
        isAllowed: true,
        remaining: MAX_SUBMISSIONS_PER_WINDOW - 1,
        resetTime: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS),
      };
    }

    // Window is still active - check submission count
    if (record.submissionCount >= MAX_SUBMISSIONS_PER_WINDOW) {
      // Rate limit exceeded
      const resetTime = new Date(
        recordWindowStart.getTime() + RATE_LIMIT_WINDOW_MS
      );
      return {
        isAllowed: false,
        remaining: 0,
        resetTime,
      };
    }

    // Within rate limit
    return {
      isAllowed: true,
      remaining: MAX_SUBMISSIONS_PER_WINDOW - record.submissionCount - 1,
      resetTime: new Date(recordWindowStart.getTime() + RATE_LIMIT_WINDOW_MS),
    };
  } catch (error) {
    console.error("[RateLimit] Error checking rate limit:", error);
    // On error, allow the request (fail open)
    return {
      isAllowed: true,
      remaining: MAX_SUBMISSIONS_PER_WINDOW,
      resetTime: null,
    };
  }
}

/**
 * Record a submission for rate limiting
 * @param ipAddress - The IP address making the submission
 */
export async function recordSubmission(ipAddress: string): Promise<void> {
  try {
    const db = await getDb();
    if (!db) {
      // Database not available - don't block submission
      return;
    }

    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

    // Find existing rate limit record for this IP
    const existingRecords = await db
      .select()
      .from(contactFormRateLimits)
      .where(eq(contactFormRateLimits.ipAddress, ipAddress))
      .limit(1);

    if (existingRecords.length === 0) {
      // Create new record
      await db.insert(contactFormRateLimits).values({
        ipAddress,
        submissionCount: 1,
        windowStart: now,
        lastSubmission: now,
      });
      return;
    }

    const record = existingRecords[0];
    const recordWindowStart = new Date(record.windowStart);

    // Check if the current window has expired
    if (recordWindowStart < windowStart) {
      // Window has expired - reset the counter
      await db
        .update(contactFormRateLimits)
        .set({
          submissionCount: 1,
          windowStart: now,
          lastSubmission: now,
          updatedAt: now,
        })
        .where(eq(contactFormRateLimits.id, record.id));
    } else {
      // Window is still active - increment the counter
      await db
        .update(contactFormRateLimits)
        .set({
          submissionCount: record.submissionCount + 1,
          lastSubmission: now,
          updatedAt: now,
        })
        .where(eq(contactFormRateLimits.id, record.id));
    }
  } catch (error) {
    console.error("[RateLimit] Error recording submission:", error);
    // Don't throw - we don't want rate limiting errors to block submissions
  }
}

/**
 * Clean up old rate limit records (optional maintenance function)
 * Call this periodically to prevent the table from growing indefinitely
 */
export async function cleanupOldRecords(): Promise<void> {
  try {
    const db = await getDb();
    if (!db) {
      return;
    }

    const cutoffDate = new Date(Date.now() - RATE_LIMIT_WINDOW_MS * 24); // Keep 24 hours of history
    
    await db
      .delete(contactFormRateLimits)
      .where(lt(contactFormRateLimits.lastSubmission, cutoffDate));
    
    console.log("[RateLimit] Cleaned up old rate limit records");
  } catch (error) {
    console.error("[RateLimit] Error cleaning up old records:", error);
  }
}

/**
 * Get the client IP address from the request
 * Handles various proxy headers
 */
export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
  // Check common proxy headers
  const forwardedFor = headers["x-forwarded-for"];
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
    return ip.split(",")[0].trim();
  }

  const realIp = headers["x-real-ip"];
  if (realIp) {
    const ip = Array.isArray(realIp) ? realIp[0] : realIp;
    return ip.trim();
  }

  const cfConnectingIp = headers["cf-connecting-ip"];
  if (cfConnectingIp) {
    const ip = Array.isArray(cfConnectingIp) ? cfConnectingIp[0] : cfConnectingIp;
    return ip.trim();
  }

  // Fallback to a default (should rarely happen in production)
  return "unknown";
}
