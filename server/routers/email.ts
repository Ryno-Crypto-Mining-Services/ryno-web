import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  serviceType: z.string().min(1, "Service type is required"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// Create Mailgun SMTP transporter
const createMailgunTransporter = () => {
  const smtpUser = process.env.MAILGUN_SMTP_USER;
  const smtpPassword = process.env.MAILGUN_SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    console.error("[Email] Missing Mailgun SMTP credentials");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // TLS (not SSL)
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
};

async function sendMailgunEmail(data: ContactFormData): Promise<boolean> {
  try {
    const transporter = createMailgunTransporter();
    if (!transporter) {
      console.error("[Email] Failed to create Mailgun transporter");
      return false;
    }

    const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
    const receiverEmail = process.env.MAILGUN_RECEIVER_EMAIL;

    if (!senderEmail || !receiverEmail) {
      console.error("[Email] Missing sender or receiver email configuration");
      return false;
    }

    const mailOptions = {
      from: `Ryno Crypto Services <${senderEmail}>`,
      to: receiverEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #32B8C6; border-bottom: 2px solid #32B8C6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
            <p><strong>Service Type:</strong> ${escapeHtml(data.serviceType)}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #32B8C6; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This email was sent from the Ryno Crypto Services contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Service Type: ${data.serviceType}

Message:
${data.message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[Email] Message sent successfully via Mailgun SMTP:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email via SMTP:", error);
    return false;
  }
}

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

export const emailRouter = router({
  sendContactForm: publicProcedure
    .input(ContactFormSchema)
    .mutation(async ({ input }) => {
      try {
        const success = await sendMailgunEmail(input);

        if (success) {
          return {
            success: true,
            message: "Email sent successfully",
          };
        } else {
          return {
            success: false,
            message: "Failed to send email. Please try again later.",
          };
        }
      } catch (error) {
        console.error("[Email Router] Error:", error);
        return {
          success: false,
          message: "An error occurred while sending your message",
        };
      }
    }),
});
