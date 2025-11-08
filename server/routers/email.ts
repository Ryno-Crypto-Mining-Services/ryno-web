import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

const emailInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  serviceType: z.string().min(1, "Service type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const emailRouter = router({
  sendContactForm: publicProcedure
    .input(emailInputSchema)
    .mutation(async ({ input }) => {
      const { name, email, company, serviceType, message } = input;

      // Mailgun API credentials from environment variables
      const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "b4afa5eb6b121187d657ccd8fde30990-02300200-b7b6116f";
      const MAILGUN_DOMAIN = "sales.rynocrypto.com";
      const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
      const SENDER_EMAIL = "notifications@sales.rynocrypto.com";
      const RECEIVER_EMAIL = "sales@hashgrid.net";

      // Create form data for Mailgun API
      const formData = new URLSearchParams();
      formData.append("from", `${name} <${SENDER_EMAIL}>`);
      formData.append("to", RECEIVER_EMAIL);
      formData.append("subject", `New Contact Form Submission from ${company}`);
      formData.append("text", `
Name: ${name}
Email: ${email}
Company: ${company}
Service Type: ${serviceType}

Message:
${message}
      `);
      formData.append("html", `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #32B8C6; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; margin-top: 5px; }
    .message-box { background-color: white; padding: 15px; border-left: 4px solid #32B8C6; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${escapeHtml(company)}</div>
      </div>
      <div class="field">
        <div class="label">Service Type:</div>
        <div class="value">${escapeHtml(serviceType)}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `);

      try {
        console.log("[Email] Sending email via Mailgun REST API to:", RECEIVER_EMAIL);
        
        // Send email via Mailgun REST API
        const response = await fetch(MAILGUN_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
          },
          body: formData,
        });

        const responseText = await response.text();
        
        if (!response.ok) {
          console.error("[Email] Mailgun API error:", response.status, responseText);
          throw new Error(`Mailgun API error: ${response.status} - ${responseText}`);
        }

        const result = JSON.parse(responseText);
        console.log("[Email] Email sent successfully via Mailgun API:", result);

        return {
          success: true,
          message: "Email sent successfully",
        };
      } catch (error) {
        console.error("[Email] Error sending email via Mailgun API:", error);
        throw new Error("Failed to send email. Please try again later.");
      }
    }),
});

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
