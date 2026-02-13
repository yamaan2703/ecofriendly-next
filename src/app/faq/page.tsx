"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HelpCircle,
  ChevronDown,
  Package,
  CreditCard,
  Truck,
  Leaf,
  RefreshCw,
  ShieldCheck,
  Mail,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqData: FAQItem[] = [
    {
      category: "products",
      question: "What materials are your toothbrushes made from?",
      answer:
        "Our toothbrushes are made from 100% biodegradable bamboo handles and BPA-free nylon bristles. The bamboo is sustainably sourced from FSC-certified forests. The handle is completely compostable and will naturally decompose in soil within 6 months.",
    },
    {
      category: "products",
      question: "Are your products really eco-friendly?",
      answer:
        "Yes! All our products are carefully designed with the environment in mind. We use sustainable materials like bamboo, avoid plastic packaging, and ensure our entire supply chain follows eco-friendly practices. Our products are biodegradable, compostable, and certified by environmental organizations.",
    },
    {
      category: "products",
      question: "How long does a bamboo toothbrush last?",
      answer:
        "A bamboo toothbrush lasts just as long as a conventional plastic toothbrush - typically 3-4 months with regular use. Dentists recommend replacing your toothbrush every 3 months or when the bristles become frayed, regardless of the material.",
    },
    {
      category: "products",
      question: "Do you offer different bristle firmness options?",
      answer:
        "Yes, we offer soft, medium, and firm bristle options. We recommend soft bristles for most people as they are gentler on gums and tooth enamel while still being effective at cleaning. Medium bristles provide a bit more scrubbing power, while firm bristles are best for those who prefer a more intense cleaning experience.",
    },
    {
      category: "products",
      question: "Are your products suitable for children?",
      answer:
        "Absolutely! We have a special children's line with smaller brush heads, softer bristles, and fun designs that kids love. Our bamboo toothbrushes are safe, non-toxic, and perfect for teaching children about environmental responsibility from an early age.",
    },
    {
      category: "shipping",
      question: "Do you offer free shipping?",
      answer:
        "Yes! We offer FREE standard shipping on all orders within the United States. Standard delivery takes 5-7 business days. For faster delivery, we also offer express shipping for $9.99, which takes 2-3 business days. International shipping is available with rates calculated at checkout.",
    },
    {
      category: "shipping",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive an email with a tracking number. You can use this tracking number on the carrier's website or log into your account on our website to track your package in real-time. If you don't receive a tracking number within 2 business days, please contact our support team.",
    },
    {
      category: "shipping",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide! International shipping costs are calculated at checkout based on your location and order weight. Delivery times vary by destination but typically range from 7-14 business days. Please note that customs fees and import duties may apply depending on your country's regulations.",
    },
    {
      category: "shipping",
      question: "What if my order arrives damaged?",
      answer:
        "We're sorry to hear that! If your order arrives damaged, please contact us within 48 hours of delivery with photos of the damaged items and packaging. We'll send you a replacement free of charge or issue a full refund. Your satisfaction is our priority.",
    },
    {
      category: "orders",
      question: "Can I modify or cancel my order after placing it?",
      answer:
        "Orders can be modified or cancelled within 1 hour of placement. After that, your order enters our processing system and cannot be changed. If you need to make changes, please contact us immediately at support@ecobamboobrush.com. We process orders quickly to ensure fast delivery!",
    },
    {
      category: "orders",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely processed with SSL encryption to protect your payment information.",
    },
    {
      category: "orders",
      question: "Do you offer subscriptions or auto-delivery?",
      answer:
        "Yes! We offer a convenient subscription service where you can receive automatic deliveries of your favorite products every 1, 2, or 3 months. Subscribers save 15% on every order and can easily pause, skip, or cancel their subscription at any time. Never run out of your eco-friendly essentials!",
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee on all products. If you're not completely satisfied, you can return unused items in their original packaging within 30 days of delivery for a full refund. Return shipping is free for defective items. For non-defective returns, customers are responsible for return shipping costs.",
    },
    {
      category: "returns",
      question: "How do I return an item?",
      answer:
        "To initiate a return, email us at support@ecobamboobrush.com with your order number and reason for return. We'll send you a return authorization number and instructions within 24 hours. Once we receive your return, refunds are processed within 5-7 business days to your original payment method.",
    },
    {
      category: "returns",
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes! If you'd like to exchange an item for a different product or size, please contact our customer service team. We'll arrange the exchange process for you. Exchanges are subject to product availability and must be requested within 30 days of delivery.",
    },
    {
      category: "sustainability",
      question: "How do I dispose of my bamboo toothbrush?",
      answer:
        "When it's time to replace your toothbrush, remove the bristles with pliers (they can be recycled with plastics in some areas), and compost the bamboo handle in your compost bin or bury it in your garden. The handle will naturally decompose in 6 months. Alternatively, you can repurpose the handle for crafts, plant markers, or cleaning tools!",
    },
    {
      category: "sustainability",
      question: "What is your packaging made from?",
      answer:
        "Our packaging is 100% plastic-free and made from recycled cardboard and paper. All packaging materials are biodegradable and recyclable. We use minimal packaging to reduce waste and our carbon footprint. Even our shipping labels and tape are eco-friendly!",
    },
    {
      category: "sustainability",
      question: "Are you a carbon-neutral company?",
      answer:
        "We're actively working towards carbon neutrality! We offset our shipping emissions through partnerships with environmental organizations that plant trees and support renewable energy projects. We also use eco-friendly manufacturing processes and sustainable materials throughout our supply chain. Every purchase helps support our mission to protect the planet.",
    },
    {
      category: "sustainability",
      question: "Do you support any environmental causes?",
      answer:
        "Yes! We donate 1% of all sales to ocean cleanup initiatives and reforestation projects. We're proud partners with Ocean Conservancy and One Tree Planted. Every purchase you make helps remove plastic from our oceans and plant new trees around the world.",
    },
    {
      category: "account",
      question: "Do I need an account to place an order?",
      answer:
        "No, you can check out as a guest. However, creating an account offers benefits like order tracking, faster checkout, exclusive discounts, and the ability to manage subscriptions. It only takes a minute to sign up!",
    },
    {
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click on the 'Login' button and then select 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password. If you don't receive the email within a few minutes, check your spam folder or contact our support team.",
    },
    {
      category: "account",
      question: "Can I update my shipping address after creating an account?",
      answer:
        "Yes! Log into your account and go to 'Account Settings' where you can add, edit, or remove shipping addresses. You can save multiple addresses for convenience when placing orders.",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "products", name: "Products", icon: Package },
    { id: "orders", name: "Orders & Payment", icon: CreditCard },
    { id: "shipping", name: "Shipping", icon: Truck },
    { id: "returns", name: "Returns", icon: RefreshCw },
    { id: "sustainability", name: "Sustainability", icon: Leaf },
    { id: "account", name: "Account", icon: ShieldCheck },
  ];

  const filteredFAQs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", "https://ecofriendlyshop.us/faq");

    // Add FAQPage Schema Markup (JSON-LD)
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "faq-schema";
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What materials are your toothbrushes made from?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our toothbrushes are made from 100% biodegradable bamboo handles and BPA-free nylon bristles. The bamboo is sustainably sourced from FSC-certified forests. The handle is completely compostable and will naturally decompose in soil within 6 months.",
          },
        },
        {
          "@type": "Question",
          name: "Are your products really eco-friendly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! All our products are designed with the environment in mind. We use sustainable materials like bamboo, avoid plastic packaging, and ensure our supply chain follows eco-friendly practices. Our products are biodegradable, compostable, and certified by environmental organizations.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a bamboo toothbrush last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A bamboo toothbrush lasts 3-4 months with regular use—the same as a plastic toothbrush. Dentists recommend replacing your toothbrush every 3 months or when bristles become frayed.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer different bristle firmness options?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we offer soft, medium, and firm bristle options. Soft bristles are recommended for most people as they are gentle on gums and enamel, while medium and firm bristles are for those who prefer a more intense cleaning experience.",
          },
        },
        {
          "@type": "Question",
          name: "Are your products suitable for children?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We have a children's line with smaller brush heads, softer bristles, and fun designs. Our bamboo toothbrushes are safe, non-toxic, and great for teaching kids about environmental responsibility.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer free shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We offer free standard shipping within the United States with delivery in 5-7 business days. Express shipping (2-3 days) is available for $9.99. International shipping rates are calculated at checkout.",
          },
        },
        {
          "@type": "Question",
          name: "How can I track my order?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once your order ships, you'll receive an email with a tracking number. You can track your package via the carrier's website or your account dashboard. If no tracking number arrives within 2 business days, please contact support.",
          },
        },
        {
          "@type": "Question",
          name: "Do you ship internationally?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we ship worldwide! International shipping rates are calculated at checkout. Delivery typically takes 7-14 business days. Customs fees or import duties may apply depending on your country.",
          },
        },
        {
          "@type": "Question",
          name: "What if my order arrives damaged?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your order arrives damaged, contact us within 48 hours with photos of the items and packaging. We will send a replacement free of charge or issue a full refund.",
          },
        },
        {
          "@type": "Question",
          name: "Can I modify or cancel my order after placing it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Orders can be modified or cancelled within 1 hour of placement. After that, they enter processing. For changes, please contact us immediately at support@ecobamboobrush.com.",
          },
        },
        {
          "@type": "Question",
          name: "What payment methods do you accept?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer subscriptions or auto-delivery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We offer subscription plans for deliveries every 1, 2, or 3 months. Subscribers save 15% and can pause, skip, or cancel anytime.",
          },
        },
        {
          "@type": "Question",
          name: "What is your return policy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a 30-day money-back guarantee. You may return unused items in their original packaging for a full refund. Returns for defective items are free; otherwise, customers cover return shipping.",
          },
        },
        {
          "@type": "Question",
          name: "How do I return an item?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Email support@ecobamboobrush.com with your order number and the reason for return. We'll provide a return authorization number and instructions. Refunds are processed within 5-7 business days after receiving the item.",
          },
        },
        {
          "@type": "Question",
          name: "Can I exchange an item instead of returning it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, exchanges are available within 30 days of delivery depending on product availability. Contact our support team to arrange an exchange.",
          },
        },
        {
          "@type": "Question",
          name: "How do I dispose of my bamboo toothbrush?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Remove the bristles with pliers and recycle them where possible. Compost the bamboo handle or bury it in soil—it decomposes naturally within 6 months. You can also repurpose the handle for crafts or gardening.",
          },
        },
        {
          "@type": "Question",
          name: "What is your packaging made from?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our packaging is 100% plastic-free, made from recycled cardboard and paper. All materials are biodegradable, recyclable, and minimal to reduce waste.",
          },
        },
        {
          "@type": "Question",
          name: "Are you a carbon-neutral company?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We are working toward carbon neutrality by offsetting shipping emissions through tree-planting and renewable energy initiatives. We use eco-friendly manufacturing and sustainable materials throughout our supply chain.",
          },
        },
      ],
    });

    // Remove existing schema if present
    const existingSchema = document.getElementById("faq-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    document.head.appendChild(schemaScript);

    // Cleanup on unmount
    return () => {
      const schemaToRemove = document.getElementById("faq-schema");
      if (schemaToRemove) {
        schemaToRemove.remove();
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
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-eurotypo mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our eco-friendly products,
            shipping, returns, and more.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground font-eurotypo mb-6 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      activeCategory === category.id
                        ? "bg-primary text-white border-primary shadow-lg"
                        : "bg-card text-foreground border-border hover:border-primary hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-semibold text-center">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 bg-primary-lighter rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <HelpCircle className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-muted-foreground flex-shrink-0 transition-transform ${
                        openIndex === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 pl-[4.5rem]">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

