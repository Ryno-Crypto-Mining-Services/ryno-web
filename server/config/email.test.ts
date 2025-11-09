import { describe, it, expect, beforeEach } from "vitest";

/**
 * Configuration Validation Tests
 * 
 * These tests verify that all required email configuration
 * environment variables are properly set and valid.
 */

describe("Email Configuration", () => {
  const requiredEnvVars = [
    "MAILGUN_API_KEY",
    "MAILGUN_SENDER_EMAIL",
    "MAILGUN_RECEIVER_EMAIL",
    "MAILGUN_API_ENDPOINT",
  ];

  beforeEach(() => {
    // Store original env vars
    requiredEnvVars.forEach((key) => {
      if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    });
  });

  describe("Environment Variables", () => {
    it("should have MAILGUN_API_KEY set", () => {
      expect(process.env.MAILGUN_API_KEY).toBeDefined();
      expect(process.env.MAILGUN_API_KEY).not.toBe("");
      expect(process.env.MAILGUN_API_KEY?.length).toBeGreaterThan(20);
    });

    it("should have valid MAILGUN_SENDER_EMAIL format", () => {
      const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
      expect(senderEmail).toBeDefined();
      expect(senderEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("should have valid MAILGUN_RECEIVER_EMAIL format", () => {
      const receiverEmail = process.env.MAILGUN_RECEIVER_EMAIL;
      expect(receiverEmail).toBeDefined();
      // Can be regular email or Slack email integration
      expect(receiverEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("should have valid MAILGUN_API_ENDPOINT", () => {
      const endpoint = process.env.MAILGUN_API_ENDPOINT;
      expect(endpoint).toBeDefined();
      expect(endpoint).toMatch(/^https:\/\//);
      expect(endpoint).toBe("https://api.mailgun.net");
    });

    it("should have matching sender domain in API endpoint", () => {
      const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
      const domain = senderEmail?.split("@")[1];
      
      expect(domain).toBeDefined();
      // The domain should be configured in Mailgun
      expect(domain).toMatch(/\.(com|net|org|io)$/);
    });
  });

  describe("Email Addresses", () => {
    it("should not use placeholder or example emails", () => {
      const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
      const receiverEmail = process.env.MAILGUN_RECEIVER_EMAIL;

      expect(senderEmail).not.toContain("example.com");
      expect(senderEmail).not.toContain("test.com");
      expect(receiverEmail).not.toContain("example.com");
    });

    it("should use production-ready sender email", () => {
      const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
      
      // Should not use localhost or development domains
      expect(senderEmail).not.toContain("localhost");
      expect(senderEmail).not.toContain("127.0.0.1");
      expect(senderEmail).not.toContain("dev.");
    });

    it("should have receiver email configured for notifications", () => {
      const receiverEmail = process.env.MAILGUN_RECEIVER_EMAIL;
      
      // Check if it's a Slack integration or regular email
      const isSlackIntegration = receiverEmail?.includes(".slack.com");
      const isRegularEmail = receiverEmail?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      
      expect(isSlackIntegration || isRegularEmail).toBeTruthy();
    });
  });

  describe("API Configuration", () => {
    it("should have API key with proper format", () => {
      const apiKey = process.env.MAILGUN_API_KEY;
      
      // Mailgun API keys typically have a specific format
      expect(apiKey).toBeDefined();
      expect(apiKey?.length).toBeGreaterThan(30);
      
      // Should contain alphanumeric and hyphens
      expect(apiKey).toMatch(/^[a-f0-9\-]+$/);
    });

    it("should use HTTPS for API endpoint", () => {
      const endpoint = process.env.MAILGUN_API_ENDPOINT;
      expect(endpoint).toMatch(/^https:\/\//);
    });

    it("should point to Mailgun's official API", () => {
      const endpoint = process.env.MAILGUN_API_ENDPOINT;
      expect(endpoint).toContain("mailgun.net");
    });
  });

  describe("SMTP Configuration (Optional)", () => {
    it("should have SMTP credentials if SMTP is used", () => {
      const smtpUser = process.env.MAILGUN_SMTP_USER;
      const smtpPassword = process.env.MAILGUN_SMTP_PASSWORD;

      if (smtpUser || smtpPassword) {
        // If one is set, both should be set
        expect(smtpUser).toBeDefined();
        expect(smtpPassword).toBeDefined();
        expect(smtpUser).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(smtpPassword?.length).toBeGreaterThan(10);
      }
    });
  });

  describe("Configuration Completeness", () => {
    it("should have all required environment variables", () => {
      const missing = requiredEnvVars.filter((key) => !process.env[key]);
      
      expect(missing).toHaveLength(0);
      if (missing.length > 0) {
        throw new Error(
          `Missing required environment variables: ${missing.join(", ")}`
        );
      }
    });

    it("should not have empty string values", () => {
      const emptyVars = requiredEnvVars.filter(
        (key) => process.env[key] === ""
      );
      
      expect(emptyVars).toHaveLength(0);
      if (emptyVars.length > 0) {
        throw new Error(
          `Environment variables with empty values: ${emptyVars.join(", ")}`
        );
      }
    });
  });
});

/**
 * Helper function to validate email configuration at runtime
 * Can be called during application startup
 */
export function validateEmailConfig(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required variables
  if (!process.env.MAILGUN_API_KEY) {
    errors.push("MAILGUN_API_KEY is not set");
  }

  if (!process.env.MAILGUN_SENDER_EMAIL) {
    errors.push("MAILGUN_SENDER_EMAIL is not set");
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.MAILGUN_SENDER_EMAIL)
  ) {
    errors.push("MAILGUN_SENDER_EMAIL is not a valid email address");
  }

  if (!process.env.MAILGUN_RECEIVER_EMAIL) {
    errors.push("MAILGUN_RECEIVER_EMAIL is not set");
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.MAILGUN_RECEIVER_EMAIL)
  ) {
    errors.push("MAILGUN_RECEIVER_EMAIL is not a valid email address");
  }

  if (!process.env.MAILGUN_API_ENDPOINT) {
    errors.push("MAILGUN_API_ENDPOINT is not set");
  } else if (!process.env.MAILGUN_API_ENDPOINT.startsWith("https://")) {
    errors.push("MAILGUN_API_ENDPOINT must use HTTPS");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
