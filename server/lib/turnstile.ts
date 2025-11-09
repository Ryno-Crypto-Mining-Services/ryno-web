/**
 * Cloudflare Turnstile CAPTCHA verification
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

/**
 * Verify a Turnstile token with Cloudflare
 * @param token - The token from the client-side Turnstile widget
 * @param remoteIp - Optional IP address of the user
 * @returns Promise resolving to verification result
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("[Turnstile] TURNSTILE_SECRET_KEY not configured");
    // Fail open in development, fail closed in production
    if (process.env.NODE_ENV === "development") {
      console.warn("[Turnstile] Allowing request in development mode");
      return { success: true };
    }
    return {
      success: false,
      errorCodes: ["missing-secret-key"],
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      console.error(
        "[Turnstile] Verification request failed:",
        response.status,
        response.statusText
      );
      return {
        success: false,
        errorCodes: ["verification-request-failed"],
      };
    }

    const result: TurnstileVerifyResponse = await response.json();

    if (!result.success) {
      console.warn("[Turnstile] Verification failed:", result["error-codes"]);
      return {
        success: false,
        errorCodes: result["error-codes"],
      };
    }

    console.log("[Turnstile] Verification successful");
    return { success: true };
  } catch (error) {
    console.error("[Turnstile] Error verifying token:", error);
    return {
      success: false,
      errorCodes: ["verification-error"],
    };
  }
}

/**
 * Get user-friendly error message for Turnstile error codes
 */
export function getTurnstileErrorMessage(errorCodes?: string[]): string {
  if (!errorCodes || errorCodes.length === 0) {
    return "CAPTCHA verification failed. Please try again.";
  }

  const code = errorCodes[0];
  
  switch (code) {
    case "missing-input-secret":
    case "invalid-input-secret":
      return "Server configuration error. Please contact support.";
    
    case "missing-input-response":
    case "invalid-input-response":
      return "CAPTCHA token is missing or invalid. Please complete the CAPTCHA.";
    
    case "timeout-or-duplicate":
      return "CAPTCHA token has expired or was already used. Please try again.";
    
    case "bad-request":
      return "Invalid CAPTCHA request. Please refresh the page and try again.";
    
    case "internal-error":
      return "CAPTCHA service error. Please try again in a moment.";
    
    default:
      return "CAPTCHA verification failed. Please try again.";
  }
}
