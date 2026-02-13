"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Scale, ShieldCheck, AlertTriangle } from "lucide-react";

export default function TermsConditionsPage() {
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
      "https://ecofriendlyshop.us/terms-conditions"
    );

    // Cleanup on unmount
    return () => {
      const linkToRemove = document.querySelector('link[rel="canonical"]');
      if (
        linkToRemove &&
        linkToRemove.getAttribute("href") ===
          "https://ecofriendlyshop.us/terms-conditions"
      ) {
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
              <Scale className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-eurotypo mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                    Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to EcoFriendly. These Terms and Conditions ("Terms")
                    govern your use of our website and services. By accessing or
                    using our website at ecobamboobrush.com ("Website"), you
                    agree to be bound by these Terms. If you do not agree to
                    these Terms, please do not use our Website.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                1. Use of Our Website
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    1.1 Eligibility
                  </h4>
                  <p>
                    You must be at least 18 years old to use our Website and
                    make purchases. By using our Website, you represent and
                    warrant that you are at least 18 years old and have the
                    legal capacity to enter into this agreement.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    1.2 Account Registration
                  </h4>
                  <p>
                    To access certain features, you may need to create an
                    account. You are responsible for maintaining the
                    confidentiality of your account credentials and for all
                    activities that occur under your account. You agree to
                    notify us immediately of any unauthorized use of your
                    account.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    1.3 Prohibited Activities
                  </h4>
                  <p className="mb-2">
                    You agree not to engage in any of the following activities:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Violating any applicable laws or regulations</li>
                    <li>
                      Infringing on intellectual property rights of others
                    </li>
                    <li>Transmitting harmful or malicious code</li>
                    <li>
                      Attempting to gain unauthorized access to our systems
                    </li>
                    <li>Using the Website for any fraudulent purpose</li>
                    <li>
                      Impersonating any person or entity or misrepresenting your
                      affiliation
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                2. Products and Orders
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    2.1 Product Information
                  </h4>
                  <p>
                    We strive to provide accurate product descriptions, images,
                    and pricing. However, we do not warrant that product
                    descriptions or other content on the Website is accurate,
                    complete, reliable, current, or error-free. We reserve the
                    right to correct any errors, inaccuracies, or omissions and
                    to change or update information at any time without prior
                    notice.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    2.2 Pricing
                  </h4>
                  <p>
                    All prices are listed in US Dollars (USD) and are subject to
                    change without notice. We reserve the right to modify prices
                    at any time. However, prices are guaranteed at the time of
                    purchase. Any applicable taxes and shipping costs will be
                    added to your order total at checkout.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    2.3 Order Acceptance
                  </h4>
                  <p>
                    Your receipt of an order confirmation does not signify our
                    acceptance of your order. We reserve the right to refuse or
                    cancel any order for any reason, including but not limited
                    to: product availability, errors in product or pricing
                    information, or suspected fraudulent activity.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    2.4 Payment
                  </h4>
                  <p>
                    Payment must be received before we dispatch your order. We
                    accept various payment methods as indicated on our Website.
                    By providing payment information, you represent and warrant
                    that you are authorized to use the designated payment
                    method.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                3. Intellectual Property Rights
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Website and its entire contents, features, and
                  functionality (including but not limited to all information,
                  software, text, displays, images, video, and audio, and the
                  design, selection, and arrangement thereof) are owned by
                  EcoFriendly, its licensors, or other providers of such
                  material and are protected by United States and international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property or proprietary rights laws.
                </p>
                <p>
                  You are granted a limited license to access and use the
                  Website for personal, non-commercial purposes. You may not
                  reproduce, distribute, modify, create derivative works of,
                  publicly display, publicly perform, republish, download,
                  store, or transmit any of the material on our Website without
                  prior written consent.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                4. User Content
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our Website may allow you to post, submit, or transmit content
                  such as reviews, comments, or feedback ("User Content"). You
                  retain all rights in your User Content, but you grant us a
                  worldwide, non-exclusive, royalty-free, perpetual, irrevocable
                  license to use, reproduce, modify, adapt, publish, translate,
                  distribute, and display such User Content in any media.
                </p>
                <p>
                  You represent and warrant that: (a) you own or have the
                  necessary rights to your User Content; (b) your User Content
                  does not violate any third-party rights; and (c) your User
                  Content does not contain any unlawful, harmful, or offensive
                  material.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                5. Limitation of Liability
              </h3>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <p className="text-sm font-semibold text-foreground">
                    IMPORTANT LEGAL NOTICE
                  </p>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                    EVENT SHALL ECOFRIENDLY, ITS AFFILIATES, OFFICERS,
                    DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                    INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE,
                    GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Your access to or use of or inability to access or use the
                      Website
                    </li>
                    <li>
                      Any conduct or content of any third party on the Website
                    </li>
                    <li>Any content obtained from the Website</li>
                    <li>
                      Unauthorized access, use, or alteration of your
                      transmissions or content
                    </li>
                  </ul>
                  <p>
                    OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED
                    TO THE WEBSITE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN
                    THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                6. Indemnification
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  You agree to defend, indemnify, and hold harmless EcoFriendly
                  and its affiliates, licensors, and service providers, and
                  their respective officers, directors, employees, contractors,
                  agents, licensors, suppliers, successors, and assigns from and
                  against any claims, liabilities, damages, judgments, awards,
                  losses, costs, expenses, or fees (including reasonable
                  attorneys' fees) arising out of or relating to your violation
                  of these Terms or your use of the Website.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                7. Governing Law and Dispute Resolution
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of the United States, without regard to its
                  conflict of law provisions. Any disputes arising from these
                  Terms or your use of the Website shall be resolved through
                  binding arbitration in accordance with the rules of the
                  American Arbitration Association.
                </p>
                <p>
                  You waive any right to participate in a class action lawsuit
                  or class-wide arbitration. All disputes must be brought on an
                  individual basis.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                8. Changes to Terms
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  We reserve the right to modify or replace these Terms at any
                  time at our sole discretion. If a revision is material, we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion. By continuing to access or
                  use our Website after those revisions become effective, you
                  agree to be bound by the revised terms.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="border-b border-border pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                9. Termination
              </h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  We may terminate or suspend your access to our Website
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach these
                  Terms. Upon termination, your right to use the Website will
                  immediately cease. All provisions of these Terms which by
                  their nature should survive termination shall survive
                  termination.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="pb-8">
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-4">
                10. Miscellaneous
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Entire Agreement
                  </h4>
                  <p>
                    These Terms constitute the entire agreement between you and
                    EcoFriendly regarding your use of the Website and supersede
                    all prior agreements and understandings.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Severability
                  </h4>
                  <p>
                    If any provision of these Terms is held to be invalid or
                    unenforceable, the remaining provisions will remain in full
                    force and effect.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Waiver</h4>
                  <p>
                    No waiver of any term of these Terms shall be deemed a
                    further or continuing waiver of such term or any other term.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

