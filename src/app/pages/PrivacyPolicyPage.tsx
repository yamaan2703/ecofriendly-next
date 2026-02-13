"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  Eye,
  Users,
  Globe,
  Cookie,
  Mail,
  Bell,
} from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute(
      "href",
      "https://ecofriendlyshop.us/privacy-policy"
    );

    // Cleanup on unmount
    return () => {
      const linkToRemove = document.querySelector('link[rel="canonical"]');
      if (linkToRemove && linkToRemove.getAttribute("href") === "https://ecofriendlyshop.us/privacy-policy") {
        linkToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#DCE7C8] py-16 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-eurotypo mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and
            protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last Updated: October 20, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <Lock className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                    Our Commitment to Your Privacy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At EcoFriendly, we are committed to protecting your privacy
                    and ensuring the security of your personal information. This
                    Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you visit our website
                    ecobamboobrush.com and use our services. Please read this
                    policy carefully to understand our practices regarding your
                    personal data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section className="border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                  1. Information We Collect
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    1.1 Personal Information
                  </h4>
                  <p className="mb-2">
                    We collect personal information that you voluntarily provide
                    to us when you:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Create an account on our website</li>
                    <li>Make a purchase or place an order</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact our customer support</li>
                    <li>Participate in surveys or promotions</li>
                    <li>Leave reviews or comments</li>
                  </ul>
                  <p className="mt-3">
                    This information may include: name, email address, mailing
                    address, phone number, payment information, and order
                    history.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    1.2 Automatically Collected Information
                  </h4>
                  <p className="mb-2">
                    When you visit our website, we automatically collect certain
                    information about your device and browsing activities,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages viewed and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Click patterns and navigation paths</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    1.3 Cookies and Tracking Technologies
                  </h4>
                  <p>
                    We use cookies, web beacons, and similar tracking
                    technologies to collect information about your browsing
                    behavior and preferences. You can control cookie settings
                    through your browser preferences. However, disabling cookies
                    may limit your ability to use certain features of our
                    website.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                  2. How We Use Your Information
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We use the information we collect for various purposes,
                  including:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      Order Processing
                    </h5>
                    <p className="text-sm">
                      To process and fulfill your orders, manage payments, and
                      provide customer support.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      Communication
                    </h5>
                    <p className="text-sm">
                      To send order confirmations, shipping updates, and respond
                      to your inquiries.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      Marketing
                    </h5>
                    <p className="text-sm">
                      To send promotional emails, newsletters, and special
                      offers (with your consent).
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      Improvement
                    </h5>
                    <p className="text-sm">
                      To improve our website, products, and services based on
                      your feedback and behavior.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      Security
                    </h5>
                    <p className="text-sm">
                      To detect, prevent, and address fraud, security issues,
                      and technical problems.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-2">
                      Legal Compliance
                    </h5>
                    <p className="text-sm">
                      To comply with applicable laws, regulations, and legal
                      processes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                  3. How We Share Your Information
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. However, we may share your information with:
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Service Providers
                  </h4>
                  <p>
                    We work with third-party service providers who assist us in
                    operating our website, conducting our business, and serving
                    our customers. These include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Payment processors (Stripe, PayPal)</li>
                    <li>Shipping and logistics companies</li>
                    <li>Email marketing services</li>
                    <li>Analytics providers</li>
                    <li>Cloud hosting services</li>
                  </ul>
                  <p className="mt-2">
                    These service providers are contractually obligated to keep
                    your information confidential and use it only for the
                    purposes we specify.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Legal Requirements
                  </h4>
                  <p>
                    We may disclose your information if required by law or in
                    response to valid requests by public authorities (e.g., law
                    enforcement, court orders).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Business Transfers
                  </h4>
                  <p>
                    In the event of a merger, acquisition, or sale of assets,
                    your personal information may be transferred to the
                    acquiring entity. We will notify you of any such change in
                    ownership.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                  4. Data Security
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include:
                </p>
                <div className="bg-primary-lighter border-2 border-primary rounded-lg p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          SSL Encryption
                        </p>
                        <p className="text-sm">
                          All data transmitted is encrypted using SSL/TLS
                          protocols.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          Secure Servers
                        </p>
                        <p className="text-sm">
                          Data stored on secure, regularly monitored servers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          Access Controls
                        </p>
                        <p className="text-sm">
                          Limited access to personal data on a need-to-know
                          basis.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          Regular Audits
                        </p>
                        <p className="text-sm">
                          Periodic security assessments and vulnerability
                          testing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  While we strive to protect your personal information, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                  5. Your Rights and Choices
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  You have the following rights regarding your personal data:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="font-semibold text-foreground min-w-[140px]">
                      Access:
                    </span>
                    <span>
                      Request a copy of the personal information we hold about
                      you.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-foreground min-w-[140px]">
                      Correction:
                    </span>
                    <span>
                      Request correction of inaccurate or incomplete
                      information.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-foreground min-w-[140px]">
                      Deletion:
                    </span>
                    <span>
                      Request deletion of your personal information, subject to
                      legal requirements.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-foreground min-w-[140px]">
                      Opt-Out:
                    </span>
                    <span>
                      Unsubscribe from marketing communications at any time by
                      clicking the unsubscribe link in our emails.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-foreground min-w-[140px]">
                      Data Portability:
                    </span>
                    <span>
                      Request a copy of your data in a structured,
                      machine-readable format.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-foreground min-w-[140px]">
                      Restriction:
                    </span>
                    <span>
                      Request restriction of processing your personal
                      information under certain circumstances.
                    </span>
                  </div>
                </div>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:privacy@ecobamboobrush.com"
                    className="text-primary hover:underline"
                  >
                    privacy@ecobamboobrush.com
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                  6. Cookies and Tracking
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience. Cookies are small data files stored
                  on your device.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Types of Cookies We Use:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <strong>Essential Cookies:</strong> Necessary for the
                      website to function properly (e.g., shopping cart).
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand how
                      visitors interact with our website (Google Analytics).
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements and track campaign performance.
                    </li>
                    <li>
                      <strong>Preference Cookies:</strong> Remember your
                      settings and preferences for future visits.
                    </li>
                  </ul>
                </div>
                <p>
                  You can manage your cookie preferences through your browser
                  settings. Note that disabling certain cookies may affect
                  website functionality.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                7. Children's Privacy
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  Our website is not intended for children under the age of 13.
                  We do not knowingly collect personal information from children
                  under 13. If we become aware that we have collected personal
                  information from a child under 13, we will take steps to
                  delete such information. If you believe we have collected
                  information from a child under 13, please contact us
                  immediately.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                8. International Data Transfers
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  Your information may be transferred to and maintained on
                  servers located outside of your state, province, country, or
                  other governmental jurisdiction where data protection laws may
                  differ. If you are located outside the United States and
                  choose to provide information to us, please note that we
                  transfer the data to the United States. By using our website,
                  you consent to this transfer.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                9. Third-Party Links
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  Our website may contain links to third-party websites that are
                  not operated by us. We have no control over and assume no
                  responsibility for the content, privacy policies, or practices
                  of any third-party websites. We encourage you to review the
                  privacy policy of every website you visit.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                10. Data Retention
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  We retain your personal information for as long as necessary
                  to fulfill the purposes outlined in this Privacy Policy,
                  unless a longer retention period is required or permitted by
                  law. When we no longer need your information, we will securely
                  delete or anonymize it.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                11. Changes to This Privacy Policy
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for legal, operational, or
                  regulatory reasons. We will notify you of any material changes
                  by posting the new Privacy Policy on this page and updating
                  the "Last Updated" date. We encourage you to review this
                  Privacy Policy periodically.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
