"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  {
    label: "Toothbrush",
    action: "product/bamboo-toothbrush-10-pack",
    type: "route",
  },
  {
    label: "Dishwasher",
    action: "product/bamboo-dish-brush-with-2-replaceable-head",
    type: "route",
  },
  { label: "Blog", action: "blog", type: "route" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const cartItemCount = getTotalItems();

  const handleNavigation = (item: {
    label: string;
    action: string;
    type: string;
  }) => {
    if (item.type === "route") {
      window.location.href = `/${item.action}`;
    } else {
      scrollToSection(item.action);
    }
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/";
    setIsOpen(false);
  };

  const handleUserClick = () => {
    if (user) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/login";
    }
    setIsOpen(false);
  };

  const handleCartClick = () => {
    window.location.href = "/cart";
    setIsOpen(false);
  };

  // Check current page for active states
  const isCartPage =
    window.location.pathname === "/cart" ||
    window.location.pathname === "/shop";
  const isProfilePage = window.location.pathname === "/profile";
  const isLoginPage = window.location.pathname === "/login";
  const isSignupPage = window.location.pathname === "/signup";
  const isBlogPage = window.location.pathname === "/blog";
  const isToothbrushPage =
    window.location.pathname === "/product/bamboo-toothbrush-10-pack";
  const isDishwasherPage =
    window.location.pathname ===
    "/product/bamboo-dish-brush-with-2-replaceable-head";

  // Only show nav items as active when on home page
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      const scrollSections = navItems
        .filter((item) => item.type === "scroll")
        .map((item) => item.action);
      const currentSection = scrollSections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-background-cream/95 backdrop-blur-sm shadow-soft"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/ecofriendly_dark.png"
                alt="EcoFriendly"
                className="h-8 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.action}
                onClick={() => handleNavigation(item)}
                className={`relative px-5 py-2 font-medium transition-colors rounded-lg text-sm ${
                  (isHomePage &&
                    item.type === "scroll" &&
                    activeSection === item.action) ||
                  (item.type === "route" &&
                    ((isBlogPage && item.action === "blog") ||
                      (isToothbrushPage &&
                        item.action === "product/bamboo-toothbrush-10-pack") ||
                      (isDishwasherPage &&
                        item.action ===
                          "product/bamboo-dish-brush-with-2-replaceable-head")))
                    ? "text-primary bg-[#DCE7C8]"
                    : "text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-1">
            {/* User Icon */}
            <button
              onClick={handleUserClick}
              className={`relative p-2 font-medium transition-colors rounded-lg text-sm ${
                isProfilePage || isLoginPage || isSignupPage
                  ? "text-primary bg-[#DCE7C8]"
                  : "text-primary hover:bg-primary hover:text-white"
              }`}
              aria-label={user ? "Profile" : "Login"}
              title={user ? "Profile" : "Login"}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={handleCartClick}
              className={`relative p-2 font-medium transition-colors rounded-lg text-sm ${
                isCartPage
                  ? "text-primary bg-[#DCE7C8]"
                  : "text-primary hover:bg-primary hover:text-white"
              }`}
              aria-label="Cart"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-primary hover:bg-primary-lighter rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-xl z-50 md:hidden">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <button
                  key={item.action}
                  onClick={() => handleNavigation(item)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    (isHomePage &&
                      item.type === "scroll" &&
                      activeSection === item.action) ||
                    (item.type === "route" &&
                      ((isBlogPage && item.action === "blog") ||
                        (isToothbrushPage &&
                          item.action ===
                            "product/bamboo-toothbrush-10-pack") ||
                        (isDishwasherPage &&
                          item.action ===
                            "product/bamboo-dish-brush-with-2-replaceable-head")))
                      ? "text-primary-foreground bg-primary"
                      : "text-primary hover:bg-primary-lighter"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* User and Cart for Mobile */}
              <div className="pt-4 border-t border-border space-y-2">
                <button
                  onClick={handleUserClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-primary hover:bg-primary-lighter rounded-lg transition-colors"
                  aria-label={user ? "Profile" : "Login"}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">
                    {user ? "Profile" : "Login"}
                  </span>
                </button>

                <button
                  onClick={handleCartClick}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-primary hover:bg-primary-lighter rounded-lg transition-colors"
                  aria-label="Cart"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-medium">Cart</span>
                  </div>
                  {cartItemCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
