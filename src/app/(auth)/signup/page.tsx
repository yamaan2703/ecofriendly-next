"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage: React.FC = () => {
    const { signup } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_newsletter: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Update or create canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement("link");
            canonicalLink.setAttribute("rel", "canonical");
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute("href", "https://ecofriendlyshop.us/signup");

        // Cleanup on unmount
        return () => {
            const linkToRemove = document.querySelector('link[rel="canonical"]');
            if (
                linkToRemove &&
                linkToRemove.getAttribute("href") === "https://ecofriendlyshop.us/signup"
            ) {
                linkToRemove.remove();
            }
        };
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await signup(
                formData.name,
                formData.email,
                formData.password,
                formData.is_newsletter
            );
        } catch (error) {
            console.error("Signup error:", error);
            // Error handling is done in the AuthContext with toast notifications
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleGoToLogin = () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {/* Header */}
                <div className="flex items-center justify-center mb-8">
                    <div className="w-60 h-20 flex items-center justify-center">
                        {/* Logo - Add your logo image at /public/images/ecofriendly_dark.png */}
                        <img
                            src="/images/ecofriendly_dark.png"
                            alt="EcoFriendly"
                            className="h-12 w-auto"
                            onError={(e) => {
                                // Fallback to text logo if image doesn't exist
                                const target = e.target as HTMLImageElement;
                                if (target && target.parentElement) {
                                    target.style.display = "none";
                                    if (!target.parentElement.querySelector(".text-logo-fallback")) {
                                        const textLogo = document.createElement("h1");
                                        textLogo.className = "text-logo-fallback text-3xl font-bold text-[#005655]";
                                        textLogo.textContent = "EcoFriendly";
                                        target.parentElement.appendChild(textLogo);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card-cream rounded-2xl shadow-xl p-8 border border-primary-lighter"
                >
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 text-sm outline-none border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${errors.name
                                        ? "border-destructive bg-red-50"
                                        : "border-input"
                                        }`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.name}
                                </motion.p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 text-sm outline-none border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${errors.email
                                        ? "border-destructive bg-red-50"
                                        : "border-input"
                                        }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-2 text-sm outline-none border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${errors.password
                                        ? "border-destructive bg-red-50"
                                        : "border-input"
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-2 text-sm outline-none border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${errors.confirmPassword
                                        ? "border-destructive bg-red-50"
                                        : "border-input"
                                        }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.confirmPassword}
                                </motion.p>
                            )}
                        </div>

                        {/* Newsletter Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_newsletter"
                                name="is_newsletter"
                                checked={formData.is_newsletter}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_newsletter: e.target.checked,
                                    }))
                                }
                                className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
                            />
                            <label
                                htmlFor="is_newsletter"
                                className="text-sm text-foreground cursor-pointer"
                            >
                                Subscribe to our newsletter for eco-friendly tips and updates
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary text-primary-foreground py-3 text-sm px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                "Create Account"
                            )}
                        </motion.button>
                    </form>

                    {/* Switch to Login */}
                    <div className="mt-3 text-center">
                        <p className="text-foreground">
                            Already have an account?{" "}
                            <button
                                onClick={handleGoToLogin}
                                className="text-primary text-sm font-semibold hover:underline transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-3"
                >
                    <p className="text-sm text-muted-foreground">
                        By signing up, you agree to our{" "}
                        <Link href="/terms-conditions" className="text-primary hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
