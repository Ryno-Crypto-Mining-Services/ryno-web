/**
 * Email Service for Mailgun Integration
 * Handles sending contact form submissions via Mailgun API
 */

interface EmailPayload {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  message: string;
}

/**
 * Send contact form email via Mailgun
 * Note: In production, this should be handled by a backend API endpoint
 * to keep credentials secure. This client-side implementation is for demonstration.
 */
export async function sendContactEmail(data: EmailPayload): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  try {
    // Validate input
    if (!data.name || !data.email || !data.company || !data.message) {
      return {
        success: false,
        message: "Missing required fields",
        error: "All fields are required",
      };
    }

    // In a production environment, you should:
    // 1. Send this request to YOUR backend API endpoint
    // 2. Keep Mailgun credentials on the backend only
    // 3. Never expose API keys in client-side code
    //
    // For now, we'll simulate the email sending with a success response
    // The actual implementation should call your backend API

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the data that would be sent (for debugging)
    console.log("Contact form submission:", {
      from: data.email,
      to: "sales@hashgrid.net",
      subject: `New Contact Form Submission from ${data.name}`,
      serviceType: data.serviceType,
      company: data.company,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Email service error:", error);
    return {
      success: false,
      message: "Failed to send email",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Format contact form data into email HTML
 */
export function formatContactEmailHTML(data: EmailPayload): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #32B8C6;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
            <p><strong>Service Type:</strong> ${escapeHtml(data.serviceType)}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3 style="color: #32B8C6;">Message:</h3>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #32B8C6;">
            ${escapeHtml(data.message)}
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            This email was sent from the Ryno Crypto Services contact form.
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Escape HTML special characters to prevent XSS
 */
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
