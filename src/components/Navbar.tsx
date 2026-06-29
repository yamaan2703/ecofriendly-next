"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { label: "Home", action: "/", type: "route" },
  {
    label: "Toothbrush",
    action: "/product/bamboo-toothbrush-10-pack",
    type: "route",
  },
  {
    label: "Dishwasher",
    action: "/product/bamboo-dish-brush-with-2-replaceable-head",
    type: "route",
  },
  { label: "Blog", action: "/blog", type: "route" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const cartItemCount = getTotalItems();

  const handleNavigation = (item: { action: string }) => {
    router.push(item.action);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    router.push("/");
    setIsOpen(false);
  };

  const handleUserClick = () => {
    if (user) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
    setIsOpen(false);
  };

  const handleCartClick = () => {
    router.push("/cart");
    setIsOpen(false);
  };

  // Check current page for active states using pathname
  const isCartPage = pathname === "/cart" || pathname === "/shop";
  const isProfilePage = pathname === "/profile";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";
  const isBlogPage = pathname === "/blog";
  const isHomePage = pathname === "/";
  const isToothbrushPage = pathname === "/product/bamboo-toothbrush-10-pack";
  const isDishwasherPage =
    pathname === "/product/bamboo-dish-brush-with-2-replaceable-head";

  function isNavItemActive(action: string) {
    if (action === "/") return isHomePage;
    if (action === "/blog") return isBlogPage;
    if (action === "/product/bamboo-toothbrush-10-pack") return isToothbrushPage;
    if (action === "/product/bamboo-dish-brush-with-2-replaceable-head")
      return isDishwasherPage;
    return false;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNavbarBg = isScrolled || isOpen;
  const isHeroNav = isHomePage && !showNavbarBg;

  const getNavLinkClass = (isActive: boolean) => {
    if (isHeroNav) {
      return isActive
        ? "font-semibold text-white after:w-full [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]"
        : "text-white/90 hover:text-white after:w-0 hover:after:w-full [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]";
    }

    return isActive
      ? "font-semibold text-primary after:w-full"
      : "text-primary/80 hover:text-primary after:w-0 hover:after:w-full";
  };

  const getIconButtonClass = (isActive: boolean) => {
    if (isHeroNav) {
      return isActive ? "text-white" : "text-white/90 hover:text-white";
    }

    return isActive ? "text-primary" : "text-primary/80 hover:text-primary";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showNavbarBg
        ? "border-b border-primary/10 bg-[#FFFFDD] shadow-md backdrop-blur-sm"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex flex-shrink-0 items-center transition-opacity hover:opacity-90"
            aria-label="Go to homepage"
          >
            <img
              src={
                showNavbarBg
                  ? "/images/ecofriendly_dark.png"
                  : "/images/ecofriendly_light.png"
              }
              alt="Ecofriendly Shop"
              className={`h-8 w-auto object-contain sm:h-9`}
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:gap-6 md:flex">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.action);

              return (
                <button
                  key={item.action}
                  onClick={() => handleNavigation(item)}
                  className={`relative pb-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-current after:transition-all ${getNavLinkClass(
                    isActive
                  )}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {/* User Icon */}
            <button
              onClick={handleUserClick}
              className={`relative p-2 transition-colors ${getIconButtonClass(
                isProfilePage || isLoginPage || isSignupPage
              )}`}
              aria-label={user ? "Profile" : "Login"}
              title={user ? "Profile" : "Login"}
            >
              <User className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
            </button>

            <button
              onClick={handleCartClick}
              className={`relative p-2 transition-colors ${getIconButtonClass(
                isCartPage
              )}`}
              aria-label="Cart"
              title="Cart"
            >
              <ShoppingBag className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#DCE7C8] px-1 text-[10px] font-bold text-primary">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors md:hidden ${getIconButtonClass(false)}`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
          <div className="fixed left-0 right-0 top-[4.25rem] z-50 border-b border-border bg-white shadow-xl md:hidden">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <button
                  key={item.action}
                  onClick={() => handleNavigation(item)}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition-colors ${
                    isNavItemActive(item.action)
                      ? "bg-primary text-primary-foreground"
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
