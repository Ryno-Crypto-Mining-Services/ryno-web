import nodemailer from "nodemailer";

async function testEmail() {
  console.log("Testing Mailgun SMTP connection...\n");

  const smtpUser = process.env.MAILGUN_SMTP_USER;
  const smtpPassword = process.env.MAILGUN_SMTP_PASSWORD;
  const senderEmail = process.env.MAILGUN_SENDER_EMAIL;
  const receiverEmail = process.env.MAILGUN_RECEIVER_EMAIL;

  console.log("Configuration:");
  console.log("- SMTP User:", smtpUser ? "✓ Set" : "✗ Missing");
  console.log("- SMTP Password:", smtpPassword ? "✓ Set" : "✗ Missing");
  console.log("- Sender Email:", senderEmail || "✗ Missing");
  console.log("- Receiver Email:", receiverEmail || "✗ Missing");
  console.log();

  if (!smtpUser || !smtpPassword || !senderEmail || !receiverEmail) {
    console.error("ERROR: Missing required environment variables");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // TLS
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    debug: true, // Enable debug output
    logger: true, // Log to console
  });

  try {
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("✓ SMTP connection verified successfully\n");

    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: `Ryno Crypto Services <${senderEmail}>`,
      to: receiverEmail,
      subject: "Test Email from Ryno Website",
      html: `
        <h2>Test Email</h2>
        <p><strong>Name:</strong> Elvis Nuno</p>
        <p><strong>Email:</strong> elvis.nuno@pm.me</p>
        <p><strong>Company:</strong> Test Mining</p>
        <p><strong>Service Type:</strong> Mining Operations</p>
        <p><strong>Message:</strong> This is just a test message.</p>
      `,
      text: "This is a test email from the Ryno Crypto Services website.",
    });

    console.log("✓ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  } catch (error) {
    console.error("✗ Email sending failed:");
    console.error(error);
    process.exit(1);
  }
}

testEmail();
