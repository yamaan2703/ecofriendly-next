"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, MapPin, Shield, Truck, RotateCcw } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src="/images/ecofriendly_dark.png"
                  alt="EcoFriendly"
                  className="h-6 sm:h-8 w-auto"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Your trusted partner in sustainable oral care. We're committed
                to providing eco-friendly products that protect both your health
                and the planet.
              </p>
              <div className="flex gap-1 sm:gap-2">
                <a
                  href="https://www.facebook.com/eco.frienddly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.instagram.com/ecofriendlyshop.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  target="https://www.linkedin.com/company/eco-friendlyy/"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors"
                  aria-label="Twitter"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-base sm:text-lg font-bold text-foreground font-eurotypo">
                Customer Service
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/shipping-info"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-base sm:text-lg font-bold text-foreground font-eurotypo">
                Get in Touch
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:support@ecobamboobrush.com"
                  className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    support@ecobamboobrush.com
                  </span>
                </a>
                <a
                  href="tel:1-800-ECO-BRUSH"
                  className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">1-800-ECO-BRUSH</span>
                </a>
                <div className="flex items-start gap-2 sm:gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    123 Eco Street
                    <br />
                    Green City, GC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-background-cream/95 py-3 sm:py-4 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                © {new Date().getFullYear()} EcoFriendly. All rights reserved.
              </p>
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-conditions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
