/**
 * Unit test for email sending functionality
 * This test directly calls the email router function
 */

import { emailRouter } from "./server/routers/email";

async function runTest() {
  console.log("=== Email Router Unit Test ===\n");

  const testData = {
    name: "Elvis Nuno",
    email: "elvis.nuno@pm.me",
    company: "Test Mining",
    serviceType: "Mining Operations",
    message: "This is just a test message.",
  };

  console.log("Test Data:");
  console.log(JSON.stringify(testData, null, 2));
  console.log();

  try {
    // Create a mock caller for the email router
    const caller = emailRouter.createCaller({} as any);
    
    console.log("Calling email.sendContactForm...");
    const result = await caller.sendContactForm(testData);
    
    console.log("\nResult:");
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log("\n✓ TEST PASSED: Email sent successfully!");
      console.log("Check sales@hashgrid.net for the test email.");
      return true;
    } else {
      console.log("\n✗ TEST FAILED:", result.message);
      return false;
    }
  } catch (error) {
    console.error("\n✗ TEST FAILED with error:");
    console.error(error);
    return false;
  }
}

runTest().then((success) => {
  process.exit(success ? 0 : 1);
});
