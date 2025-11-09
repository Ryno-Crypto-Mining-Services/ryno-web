import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { checkRateLimit, recordSubmission, getClientIp } from "../lib/rateLimit";

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
    .mutation(async ({ input, ctx }) => {
      const { name, email, company, serviceType, message } = input;

      // Get client IP address for rate limiting
      const clientIp = getClientIp(ctx.req.headers);
      console.log("[Email] Request from IP:", clientIp);

      // Check rate limit
      const rateLimitResult = await checkRateLimit(clientIp);
      if (!rateLimitResult.isAllowed) {
        const resetTime = rateLimitResult.resetTime;
        const minutesUntilReset = resetTime
          ? Math.ceil((resetTime.getTime() - Date.now()) / 60000)
          : 60;
        throw new Error(
          `Rate limit exceeded. You can submit again in ${minutesUntilReset} minutes. Maximum 3 submissions per hour.`
        );
      }

      // Mailgun API credentials from environment variables
      const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
      const MAILGUN_DOMAIN = "sales.rynocrypto.com";
      const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
      const SENDER_EMAIL = process.env.MAILGUN_SENDER_EMAIL || "notifications@sales.rynocrypto.com";
      const RECEIVER_EMAIL = process.env.MAILGUN_RECEIVER_EMAIL || "sales@hashgrid.net";

      // Validate required environment variables
      if (!MAILGUN_API_KEY) {
        console.error("[Email] MAILGUN_API_KEY environment variable is not set");
        throw new Error("Email service is not configured properly");
      }

      console.log("[Email] Configuration:", {
        domain: MAILGUN_DOMAIN,
        sender: SENDER_EMAIL,
        receiver: RECEIVER_EMAIL,
        apiKeySet: !!MAILGUN_API_KEY
      });

      try {
        // 1. Send notification email to admin
        const adminFormData = new URLSearchParams();
        adminFormData.append("from", `${name} <${SENDER_EMAIL}>`);
        adminFormData.append("to", RECEIVER_EMAIL);
        adminFormData.append("subject", `New Contact Form Submission from ${company}`);
        adminFormData.append("text", `
Name: ${name}
Email: ${email}
Company: ${company}
Service Type: ${serviceType}

Message:
${message}
        `);
        adminFormData.append("html", `
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

        console.log("[Email] Sending admin notification email to:", RECEIVER_EMAIL);
        
        const adminResponse = await fetch(MAILGUN_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
          },
          body: adminFormData,
        });

        const adminResponseText = await adminResponse.text();
        
        if (!adminResponse.ok) {
          console.error("[Email] Admin email error:", adminResponse.status, adminResponseText);
          throw new Error(`Failed to send admin notification: ${adminResponse.status}`);
        }

        const adminResult = JSON.parse(adminResponseText);
        console.log("[Email] Admin notification sent:", adminResult);

        // 2. Send confirmation email to user
        const userFormData = new URLSearchParams();
        userFormData.append("from", `Ryno Crypto Services <${SENDER_EMAIL}>`);
        userFormData.append("to", email);
        userFormData.append("subject", "Thank you for contacting Ryno Crypto Services");
        userFormData.append("text", `
Dear ${name},

Thank you for reaching out to Ryno Crypto Services. We have received your inquiry and appreciate your interest in our TerraHash Stack mining solutions.

Your inquiry details:
Company: ${company}
Service Type: ${serviceType}

Our team will review your message and respond within 24-48 business hours. If your inquiry is urgent, please feel free to contact us directly at sales@hashgrid.net.

In the meantime, feel free to explore our resources:
- TerraHash Stack Whitepaper: https://ryno.manus.space/terrahash-stack-whitepaper-technical-v1-0.pdf
- TerraHash Stack Litepaper: https://ryno.manus.space/terrahash-stack-litepaper-technical-v1-0.pdf

Best regards,
The Ryno Crypto Services Team

---
Ryno Crypto Services, LLC
Email: sales@hashgrid.net
Website: https://ryno.manus.space
        `);
        userFormData.append("html", `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #32B8C6 0%, #2A9BA8 100%); color: white; padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
    .message { color: #555; margin-bottom: 30px; line-height: 1.8; }
    .details-box { background-color: #f9f9f9; padding: 20px; border-left: 4px solid #32B8C6; margin: 30px 0; }
    .details-box h3 { margin: 0 0 15px 0; color: #32B8C6; font-size: 16px; }
    .detail-item { margin-bottom: 10px; }
    .detail-label { font-weight: 600; color: #555; }
    .detail-value { color: #333; }
    .resources { background-color: #f0f8fa; padding: 25px; border-radius: 6px; margin: 30px 0; }
    .resources h3 { margin: 0 0 15px 0; color: #32B8C6; font-size: 16px; }
    .resources ul { margin: 0; padding-left: 20px; }
    .resources li { margin-bottom: 10px; }
    .resources a { color: #32B8C6; text-decoration: none; }
    .resources a:hover { text-decoration: underline; }
    .footer { background-color: #1F2121; color: #999; padding: 30px; text-align: center; font-size: 13px; }
    .footer strong { color: #32B8C6; }
    .footer a { color: #32B8C6; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    .divider { height: 1px; background-color: #e0e0e0; margin: 30px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us</h1>
      <p>Ryno Crypto Services | TerraHash Stack</p>
    </div>
    <div class="content">
      <div class="greeting">Dear ${escapeHtml(name)},</div>
      
      <div class="message">
        Thank you for reaching out to Ryno Crypto Services. We have received your inquiry and appreciate your interest in our <strong>TerraHash Stack</strong> mining solutions.
      </div>

      <div class="details-box">
        <h3>Your Inquiry Details</h3>
        <div class="detail-item">
          <span class="detail-label">Company:</span>
          <span class="detail-value">${escapeHtml(company)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Service Type:</span>
          <span class="detail-value">${escapeHtml(serviceType)}</span>
        </div>
      </div>

      <div class="message">
        Our team will review your message and respond within <strong>24-48 business hours</strong>. If your inquiry is urgent, please feel free to contact us directly at <a href="mailto:sales@hashgrid.net" style="color: #32B8C6;">sales@hashgrid.net</a>.
      </div>

      <div class="resources">
        <h3>📚 Explore Our Resources</h3>
        <ul>
          <li><a href="https://ryno.manus.space/terrahash-stack-whitepaper-technical-v1-0.pdf" target="_blank">TerraHash Stack Whitepaper (Technical)</a></li>
          <li><a href="https://ryno.manus.space/terrahash-stack-litepaper-technical-v1-0.pdf" target="_blank">TerraHash Stack Litepaper</a></li>
          <li><a href="https://ryno.manus.space" target="_blank">Visit Our Website</a></li>
        </ul>
      </div>

      <div class="divider"></div>

      <div class="message" style="margin-bottom: 0;">
        Best regards,<br>
        <strong>The Ryno Crypto Services Team</strong>
      </div>
    </div>
    <div class="footer">
      <strong>Ryno Crypto Services, LLC</strong><br>
      Email: <a href="mailto:sales@hashgrid.net">sales@hashgrid.net</a><br>
      Website: <a href="https://ryno.manus.space" target="_blank">https://ryno.manus.space</a>
    </div>
  </div>
</body>
</html>
        `);

        console.log("[Email] Sending confirmation email to user:", email);

        const userResponse = await fetch(MAILGUN_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
          },
          body: userFormData,
        });

        const userResponseText = await userResponse.text();
        
        if (!userResponse.ok) {
          console.error("[Email] User confirmation email error:", userResponse.status, userResponseText);
          // Don't throw error here - admin email was sent successfully
          console.warn("[Email] Failed to send user confirmation, but admin notification was successful");
        } else {
          const userResult = JSON.parse(userResponseText);
          console.log("[Email] User confirmation sent:", userResult);
        }

        // Record this submission for rate limiting
        await recordSubmission(clientIp);

        return {
          success: true,
          message: "Email sent successfully",
        };
      } catch (error) {
        console.error("[Email] Error sending emails:", error);
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
