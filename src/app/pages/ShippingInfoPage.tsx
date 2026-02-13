"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Truck,
  Package,
  RotateCcw,
  Globe,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  MapPin,
  DollarSign,
} from "lucide-react";

const ShippingInfoPage: React.FC = () => {
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
      "https://ecofriendlyshop.us/shipping-info"
    );

    // Cleanup on unmount
    return () => {
      const linkToRemove = document.querySelector('link[rel="canonical"]');
      if (linkToRemove && linkToRemove.getAttribute("href") === "https://ecofriendlyshop.us/shipping-info") {
        linkToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute right-0 top-32 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 z-0 pointer-events-none opacity-50">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="absolute left-0 bottom-32 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 z-0 pointer-events-none opacity-30 rotate-180">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#DCE7C8] py-16 px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Truck className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-eurotypo mb-4">
            Shipping & Exchange Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering your eco-friendly products safely and
            sustainably to your doorstep.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Shipping Information */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground font-eurotypo">
                Shipping Information
              </h2>
            </div>

            <div className="space-y-8">
              {/* Processing Time */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Processing Time
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All orders are processed within{" "}
                      <strong>1-2 business days</strong>. Orders are not shipped
                      or delivered on weekends or holidays. If we experience a
                      high volume of orders, shipments may be delayed by a few
                      days. Please allow additional days in transit for
                      delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Rates & Delivery Estimates */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Shipping Rates & Delivery Estimates
                    </h3>
                    <div className="space-y-4">
                      <div className="border-b border-border pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-foreground">
                            Standard Shipping
                          </span>
                          <span className="text-primary font-bold">FREE</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Delivery: 5-7 business days (USA)
                        </p>
                      </div>

                      <div className="border-b border-border pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-foreground">
                            Express Shipping
                          </span>
                          <span className="text-primary font-bold">$9.99</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Delivery: 2-3 business days (USA)
                        </p>
                      </div>

                      <div className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-foreground">
                            International Shipping
                          </span>
                          <span className="text-primary font-bold">
                            Calculated at checkout
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Delivery: 7-14 business days (varies by location)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Order Tracking
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Once your order has shipped, you will receive an email
                      with a tracking number. You can track your package using
                      the carrier's website or through your account on our
                      website.
                    </p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>
                        Track your order 24/7 from shipment to delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eco-Friendly Packaging */}
              <div className="bg-primary-lighter border-2 border-primary rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Sustainable Packaging
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All our shipments use{" "}
                      <strong>100% recyclable and biodegradable</strong>{" "}
                      packaging materials. We use minimal packaging to reduce
                      waste and our carbon footprint. No plastic materials are
                      used in our shipping process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Return & Exchange Policy */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground font-eurotypo">
                Return & Exchange Policy
              </h2>
            </div>

            <div className="space-y-8">
              {/* 30-Day Return */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      30-Day Money Back Guarantee
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We want you to be completely satisfied with your purchase.
                      If you're not happy with your order, you can return it
                      within <strong>30 days</strong> of delivery for a full
                      refund or exchange.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>
                          Products must be unused and in original packaging
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Return shipping is FREE for defective items</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Refunds processed within 5-7 business days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Return */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  How to Return or Exchange
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Contact Our Support Team
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Email us at support@ecobamboobrush.com with your order
                        number and reason for return.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Receive Return Authorization
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We'll send you a return authorization number and
                        shipping label within 24 hours.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Ship Your Return
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pack the item securely using eco-friendly materials and
                        attach the return label.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Get Your Refund
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Once we receive your return, we'll process your refund
                        within 5-7 business days.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Important Return Policy Notes
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>
                          Items must be returned in their original, unopened
                          packaging for hygiene reasons.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>
                          Sale and promotional items may have different return
                          policies (check product page).
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>
                          Customer is responsible for return shipping costs
                          unless the item is defective or damaged.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>
                          Please allow 5-7 business days after we receive your
                          return for the refund to appear in your account.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingInfoPage;
