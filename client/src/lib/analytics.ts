/**
 * Google Analytics 4 event tracking utility
 * Provides type-safe event tracking for user interactions
 */

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a custom event in Google Analytics 4
 * @param eventName - Name of the event (e.g., 'contact_form_submit')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
    console.log("[Analytics] Event tracked:", eventName, eventParams);
  } else {
    console.warn("[Analytics] gtag not available, event not tracked:", eventName);
  }
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(data: {
  serviceType: string;
  company: string;
}) {
  trackEvent("contact_form_submit", {
    event_category: "engagement",
    event_label: data.serviceType,
    company_name: data.company,
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaName,
    location: location,
  });
}

/**
 * Track navigation link clicks
 */
export function trackNavigationClick(linkName: string, destination: string) {
  trackEvent("navigation_click", {
    event_category: "navigation",
    event_label: linkName,
    destination: destination,
  });
}

/**
 * Track PDF downloads
 */
export function trackPDFDownload(pdfName: string) {
  trackEvent("pdf_download", {
    event_category: "downloads",
    event_label: pdfName,
    file_type: "pdf",
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLinkClick(linkName: string, url: string) {
  trackEvent("external_link_click", {
    event_category: "outbound",
    event_label: linkName,
    destination_url: url,
  });
}

/**
 * Track page views (for SPA navigation)
 */
export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-8D2LWJRBF6", {
      page_path: pagePath,
      page_title: pageTitle,
    });
    console.log("[Analytics] Page view tracked:", pagePath, pageTitle);
  }
}
