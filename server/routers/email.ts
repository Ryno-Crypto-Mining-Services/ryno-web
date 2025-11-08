import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  serviceType: z.string().min(1, "Service type is required"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

async function sendMailgunEmail(data: ContactFormData): Promise<boolean> {
  try {
    const apiKey = process.env.MAILGUN_API_KEY;
    const apiEndpoint = process.env.MAILGUN_API_ENDPOINT;
    const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
    const receiverEmail = process.env.MAILGUN_RECEIVER_EMAIL;

    if (!apiKey || !apiEndpoint || !senderEmail || !receiverEmail) {
      console.error("[Email] Missing Mailgun configuration");
      return false;
    }

    const domain = senderEmail.split("@")[1];
    const url = `${apiEndpoint}/v3/${domain}/messages`;

    const formData = new URLSearchParams();
    formData.append("from", `Ryno Crypto Services <${senderEmail}>`);
    formData.append("to", receiverEmail);
    formData.append("subject", `New Contact Form Submission from ${data.name}`);
    formData.append(
      "html",
      `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
      <p><strong>Service Type:</strong> ${escapeHtml(data.serviceType)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `
    );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Email] Mailgun error:", response.status, errorText);
      return false;
    }

    console.log("[Email] Message sent successfully via Mailgun");
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
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
