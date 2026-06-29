"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

const customerLinks = [
  { label: "Shipping Info", href: "/shipping-info" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-5 lg:col-span-5">
              <img
                src="/images/ecofriendly_light.png"
                alt="Ecofriendly Shop"
                className="h-8 w-auto sm:h-9"
              />
              <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-[15px]">
                Your trusted partner in sustainable living. We are committed to
                eco-friendly products that protect your health and the planet.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/eco.frienddly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#DCE7C8] hover:text-primary"
                  aria-label="Facebook"
                >
                  <FaFacebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/ecofriendlyshop.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#DCE7C8] hover:text-primary"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/eco-friendlyy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#DCE7C8] hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                Customer Service
              </h4>
              <ul className="space-y-2.5">
                {customerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-[#DCE7C8]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 lg:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:support@ecobamboobrush.com"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-[#DCE7C8]"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#DCE7C8]" />
                  support@ecobamboobrush.com
                </a>
                <a
                  href="tel:1-800-ECO-BRUSH"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-[#DCE7C8]"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#DCE7C8]" />
                  1-800-ECO-BRUSH
                </a>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#DCE7C8]" />
                  <span>
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

      <div className="border-t border-white/15">
        <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-center text-xs text-white/55 sm:text-left sm:text-sm">
              © {new Date().getFullYear()} EcoFriendly. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs sm:text-sm">
              <Link
                href="/privacy-policy"
                className="text-white/55 transition-colors hover:text-[#DCE7C8]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-white/55 transition-colors hover:text-[#DCE7C8]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
