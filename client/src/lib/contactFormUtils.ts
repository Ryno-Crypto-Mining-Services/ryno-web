/**
 * Utility functions for contact form interactions
 */

export interface ContactFormData {
  serviceType?: string;
  message?: string;
}

/**
 * Scrolls to the contact form and pre-fills it with data
 */
export function scrollToContactForm(data?: ContactFormData) {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    
    // Wait for scroll to complete before filling form
    setTimeout(() => {
      if (data) {
        // Dispatch custom event with form data
        const event = new CustomEvent("prefillContactForm", {
          detail: data,
        });
        window.dispatchEvent(event);
      }
    }, 800);
  }
}

/**
 * Get pre-filled message template for retrofitting service
 */
export function getRetrofittingMessageTemplate(tierName?: string): string {
  const tierText = tierName ? ` for the ${tierName} tier` : "";
  return `I'm interested in learning more about your TerraHash Stack retrofitting services${tierText}.

Please provide me with:
- Detailed pricing and timeline
- Technical requirements and compatibility assessment
- Expected ROI and performance improvements
- Next steps to get started

Facility Details:
[Please provide any relevant details about your mining facility, such as:
- Current number of miners and models
- Existing cooling infrastructure
- Power capacity and energy costs
- Geographic location and climate conditions
- Any specific challenges or requirements]`;
}
