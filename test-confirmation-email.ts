import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./server/routers";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

async function testConfirmationEmail() {
  console.log("\n🧪 Testing Contact Form with Confirmation Email...\n");

  try {
    const result = await trpc.email.sendContactForm.mutate({
      name: "Elvis Nuno",
      email: "elvis.nuno@pm.me",
      company: "Test Mining Co",
      serviceType: "Mining Operations",
      message: "Testing automated confirmation email functionality. This should send two emails: one to admin and one confirmation to the user.",
    });

    console.log("✅ Test passed!");
    console.log("Result:", result);
    console.log("\n📧 Expected emails:");
    console.log("1. Admin notification to: sales@hashgrid.net");
    console.log("2. User confirmation to: elvis.nuno@pm.me");
    console.log("\nPlease check both inboxes to verify delivery.");
  } catch (error) {
    console.error("❌ Test failed!");
    console.error("Error:", error);
    process.exit(1);
  }
}

testConfirmationEmail();
