/**
 * Test script for contact form email submission
 * Tests the tRPC email router with sample data
 */

// Using Node.js built-in fetch (Node 18+)

const API_URL = "http://localhost:3000/api/trpc/email.sendContactForm?batch=1";

const testData = {
  name: "Elvis Nuno",
  email: "elvis.nuno@pm.me",
  company: "Test Mining",
  serviceType: "Mining Operations",
  message: "This is just a test message.",
};

async function testContactForm() {
  console.log("Testing Contact Form Email Submission\n");
  console.log("Test Data:");
  console.log(JSON.stringify(testData, null, 2));
  console.log();

  try {
    console.log("Sending POST request to tRPC endpoint...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "0": { input: testData } }),
    });

    console.log("Response Status:", response.status, response.statusText);
    
    const result = await response.json();
    console.log("Response Body:");
    console.log(JSON.stringify(result, null, 2));
    console.log();

    if (result.result?.data?.success) {
      console.log("✓ TEST PASSED: Email sent successfully!");
      console.log("Message:", result.result.data.message);
      return true;
    } else {
      console.error("✗ TEST FAILED: Email sending failed");
      console.error("Error:", result.result?.data?.message || "Unknown error");
      return false;
    }
  } catch (error) {
    console.error("✗ TEST FAILED: Request error");
    console.error(error);
    return false;
  }
}

// Run the test
testContactForm().then((success) => {
  process.exit(success ? 0 : 1);
});
