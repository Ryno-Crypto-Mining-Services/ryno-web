import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackContactFormSubmit } from "@/lib/analytics";
import type { ContactFormData } from "@/lib/contactFormUtils";
import { TURNSTILE_SITE_KEY } from "@/const";

interface FormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  message: string;
  turnstileToken: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  serviceType?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    serviceType: "mining",
    message: "",
    turnstileToken: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Load Turnstile script and set up callback
  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Set up Turnstile callback
    (window as any).onTurnstileSuccess = (token: string) => {
      setFormData((prev) => ({
        ...prev,
        turnstileToken: token,
      }));
    };

    return () => {
      document.head.removeChild(script);
      delete (window as any).onTurnstileSuccess;
    };
  }, []);

  // Listen for pre-fill events from other components
  useEffect(() => {
    const handlePrefill = (event: CustomEvent<ContactFormData>) => {
      const { serviceType, message } = event.detail;
      setFormData((prev) => ({
        ...prev,
        ...(serviceType && { serviceType }),
        ...(message && { message }),
      }));
    };

    window.addEventListener("prefillContactForm" as any, handlePrefill);
    return () => {
      window.removeEventListener("prefillContactForm" as any, handlePrefill);
    };
  }, []);

  const sendContactFormMutation = trpc.email.sendContactForm.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        // Track successful form submission
        trackContactFormSubmit({
          serviceType: formData.serviceType,
          company: formData.company,
        });
        
        setSubmitStatus("success");
        setSubmitMessage(
          "Thank you for reaching out! We will get back to you within 24 hours."
        );
        setFormData({
          name: "",
          email: "",
          company: "",
          serviceType: "mining",
          message: "",
          turnstileToken: "",
        });
        setErrors({});

        setTimeout(() => {
          setSubmitStatus("idle");
          setSubmitMessage("");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.message || "Failed to send message. Please try again.");
      }
    },
    onError: (error) => {
      setSubmitStatus("error");
      setSubmitMessage("Failed to send message. Please try again later.");
      console.error("Email submission error:", error);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!formData.turnstileToken) {
      setSubmitStatus("error");
      setSubmitMessage("Please complete the CAPTCHA verification.");
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors above");
      return;
    }

    sendContactFormMutation.mutate(formData);
  };

  const serviceOptions = [
    { value: "mining", label: "Mining Operations" },
    { value: "retrofitting", label: "Retrofitting Services" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "consultation", label: "Consultation" },
    { value: "other", label: "Other" },
  ];

  const isSubmitting = sendContactFormMutation.isPending;

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(50, 184, 198, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Get in <span className="text-accent">Touch</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to revolutionize your mining operation? Let's discuss how
                TerraHash Stack can transform your facility.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:sales@hashgrid.net"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    sales@hashgrid.net
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-muted-foreground">
                    Available for consultation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    United States
                  </p>
                </div>
              </div>
            </div>

            <Card className="mt-8 p-4 bg-accent/5 border-accent/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Response Time:</span>{" "}
                We typically respond within 24 hours during business days.
              </p>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 ${
                      errors.name ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 ${
                      errors.email ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Mining Operation"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 ${
                      errors.company ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Service Type *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 ${
                      errors.serviceType ? "border-red-500" : "border-border"
                    }`}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your mining operation and what you're looking to achieve..."
                    rows={5}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:ring-2 focus:ring-accent resize-none disabled:opacity-50 ${
                      errors.message ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Cloudflare Turnstile CAPTCHA */}
                <div className="flex justify-center">
                  <div
                    className="cf-turnstile"
                    data-sitekey={TURNSTILE_SITE_KEY}
                    data-callback="onTurnstileSuccess"
                    data-theme="light"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-sm text-green-500">{submitMessage}</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-500">{submitMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-base font-semibold bg-accent hover:bg-accent/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Your information will only be used to
                  respond to your inquiry.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
