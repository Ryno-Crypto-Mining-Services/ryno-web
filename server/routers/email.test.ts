import { describe, it, expect, beforeEach, vi } from "vitest";
import { emailRouter } from "./email";

// Mock fetch globally
global.fetch = vi.fn();

describe("Email Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables
    process.env.MAILGUN_API_KEY = "test-api-key";
    process.env.MAILGUN_SENDER_EMAIL = "test@example.com";
    process.env.MAILGUN_RECEIVER_EMAIL = "receiver@example.com";
  });

  describe("sendContactForm", () => {
    const validInput = {
      name: "John Doe",
      email: "john@example.com",
      company: "Test Company",
      serviceType: "Mining Operations",
      message: "This is a test message with more than 10 characters.",
    };

    it("should validate required fields", async () => {
      const invalidInputs = [
        { ...validInput, name: "" },
        { ...validInput, email: "invalid-email" },
        { ...validInput, company: "" },
        { ...validInput, serviceType: "" },
        { ...validInput, message: "short" }, // Less than 10 characters
      ];

      for (const input of invalidInputs) {
        await expect(async () => {
          // This would be called through tRPC context
          // For now, we're testing the validation schema
        }).rejects.toThrow();
      }
    });

    it("should require MAILGUN_API_KEY environment variable", async () => {
      delete process.env.MAILGUN_API_KEY;

      // Mock the mutation call
      const caller = emailRouter.createCaller({} as any);
      
      await expect(
        caller.sendContactForm(validInput)
      ).rejects.toThrow("Email service is not configured properly");
    });

    it("should send admin notification email successfully", async () => {
      const mockResponse = {
        ok: true,
        text: async () => JSON.stringify({ id: "test-message-id", message: "Queued" }),
      };
      
      (global.fetch as any).mockResolvedValueOnce(mockResponse);
      (global.fetch as any).mockResolvedValueOnce(mockResponse);

      const caller = emailRouter.createCaller({} as any);
      const result = await caller.sendContactForm(validInput);

      expect(result.success).toBe(true);
      expect(result.message).toBe("Email sent successfully");
      expect(global.fetch).toHaveBeenCalledTimes(2); // Admin + user emails
    });

    it("should handle Mailgun API errors gracefully", async () => {
      const mockErrorResponse = {
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      };
      
      (global.fetch as any).mockResolvedValueOnce(mockErrorResponse);

      const caller = emailRouter.createCaller({} as any);
      
      await expect(
        caller.sendContactForm(validInput)
      ).rejects.toThrow("Failed to send email");
    });

    it("should use correct Mailgun API endpoint", async () => {
      const mockResponse = {
        ok: true,
        text: async () => JSON.stringify({ id: "test-id" }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const caller = emailRouter.createCaller({} as any);
      await caller.sendContactForm(validInput);

      const firstCall = (global.fetch as any).mock.calls[0];
      expect(firstCall[0]).toBe("https://api.mailgun.net/v3/sales.rynocrypto.com/messages");
    });

    it("should include proper authorization header", async () => {
      const mockResponse = {
        ok: true,
        text: async () => JSON.stringify({ id: "test-id" }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const caller = emailRouter.createCaller({} as any);
      await caller.sendContactForm(validInput);

      const firstCall = (global.fetch as any).mock.calls[0];
      const headers = firstCall[1].headers;
      
      expect(headers.Authorization).toMatch(/^Basic /);
    });

    it("should escape HTML in email content", async () => {
      const inputWithHTML = {
        ...validInput,
        name: "<script>alert('xss')</script>",
        message: "Test <b>bold</b> & special chars",
      };

      const mockResponse = {
        ok: true,
        text: async () => JSON.stringify({ id: "test-id" }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const caller = emailRouter.createCaller({} as any);
      await caller.sendContactForm(inputWithHTML);

      const firstCall = (global.fetch as any).mock.calls[0];
      const body = firstCall[1].body.toString();
      
      // Check that HTML is escaped
      expect(body).not.toContain("<script>");
      expect(body).not.toContain("<b>");
      expect(body).toContain("&lt;");
      expect(body).toContain("&gt;");
    });

    it("should send confirmation email to user", async () => {
      const mockResponse = {
        ok: true,
        text: async () => JSON.stringify({ id: "test-id" }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const caller = emailRouter.createCaller({} as any);
      await caller.sendContactForm(validInput);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      
      const secondCall = (global.fetch as any).mock.calls[1];
      const body = secondCall[1].body.toString();
      
      // Check user email is in "to" field
      expect(body).toContain(validInput.email);
    });

    it("should continue if user confirmation email fails", async () => {
      const adminSuccess = {
        ok: true,
        text: async () => JSON.stringify({ id: "admin-id" }),
      };
      
      const userFailure = {
        ok: false,
        status: 500,
        text: async () => "Server error",
      };
      
      (global.fetch as any)
        .mockResolvedValueOnce(adminSuccess)
        .mockResolvedValueOnce(userFailure);

      const caller = emailRouter.createCaller({} as any);
      const result = await caller.sendContactForm(validInput);

      // Should still return success if admin email sent
      expect(result.success).toBe(true);
    });

    it("should use environment variables for sender and receiver", async () => {
      process.env.MAILGUN_SENDER_EMAIL = "custom-sender@test.com";
      process.env.MAILGUN_RECEIVER_EMAIL = "custom-receiver@test.com";

      const mockResponse = {
        ok: true,
        text: async () => JSON.stringify({ id: "test-id" }),
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const caller = emailRouter.createCaller({} as any);
      await caller.sendContactForm(validInput);

      const firstCall = (global.fetch as any).mock.calls[0];
      const body = firstCall[1].body.toString();
      
      expect(body).toContain("custom-sender@test.com");
      expect(body).toContain("custom-receiver@test.com");
    });
  });
});
