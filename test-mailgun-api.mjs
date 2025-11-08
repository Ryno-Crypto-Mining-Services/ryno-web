// Test Mailgun REST API directly
const MAILGUN_API_KEY = "b4afa5eb6b121187d657ccd8fde30990-02300200-b7b6116f";
const MAILGUN_DOMAIN = "sales.rynocrypto.com";
const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

const formData = new URLSearchParams();
formData.append("from", "Elvis Nuno <notifications@sales.rynocrypto.com>");
formData.append("to", "sales@hashgrid.net");
formData.append("subject", "Test Email from Mailgun REST API");
formData.append("text", "This is a test email sent via Mailgun REST API from Node.js");
formData.append("html", "<h1>Test Email</h1><p>This is a test email sent via Mailgun REST API from Node.js</p>");

console.log("Sending test email via Mailgun REST API...");
console.log("API URL:", MAILGUN_API_URL);

try {
  const response = await fetch(MAILGUN_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
    },
    body: formData,
  });

  const responseText = await response.text();
  console.log("\nResponse status:", response.status);
  console.log("Response:", responseText);

  if (response.ok) {
    const result = JSON.parse(responseText);
    console.log("\n✅ Email sent successfully!");
    console.log("Message ID:", result.id);
    console.log("Message:", result.message);
  } else {
    console.log("\n❌ Failed to send email");
  }
} catch (error) {
  console.error("\n❌ Error:", error.message);
}
