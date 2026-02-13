import React, { useState } from "react";
import { Mail, CheckCircle, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { SiMinutemailer } from "react-icons/si";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

function NewsLetter() {
  const { content } = useContent();
  const { user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if user is logged in
    if (!isAuthenticated || !user) {
      toast.error("Please login to subscribe to our newsletter");
      return;
    }

    // Check if the entered email matches the logged-in user's email
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      toast.error("Please use the email address associated with your account");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user exists with this email
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("id, email, is_newsletter")
        .eq("email", email)
        .single();

      if (fetchError) {
        if (fetchError.code === "PGRST116") {
          toast.error(
            "No account found with this email. Please sign up first."
          );
        } else {
          toast.error("Failed to process your request. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Check if already subscribed
      if (userData.is_newsletter) {
        toast.success("You're already subscribed to our newsletter!");
        setEmail("");
        setIsLoading(false);
        return;
      }

      // Update is_newsletter to true
      const { error: updateError } = await supabase
        .from("users")
        .update({ is_newsletter: true })
        .eq("id", userData.id);

      if (updateError) {
        toast.error("Failed to subscribe. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative px-4 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-0 w-64 h-64 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="container mx-auto max-w-5xl">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-[#DCE7C8] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center shadow-lg sm:shadow-2xl overflow-hidden backdrop-blur-md border border-primary/10">
            {/* Subtle background decorative blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-70 pointer-events-none" />

            {/* Heading */}
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-dark mb-3 sm:mb-4 font-eurotypo italic drop-shadow-sm flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              <span>Subscribe Our</span>{" "}
              <span className="text-primary italic">Newsletter</span>{" "}
              <SiMinutemailer className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0 sm:mt-1 md:mt-2 text-primary" />
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Be the first to know about new arrivals, exclusive deals, and
              sustainable living tips.{" "}
              <span className="font-bold text-primary">
                Join 10,000+ eco-warriors!
              </span>
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto mb-6 sm:mb-8 md:mb-10"
            >
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base text-foreground placeholder-muted-foreground bg-white border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-md sm:shadow-lg"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="text-sm sm:text-base py-2 sm:py-2.5 px-6 sm:px-8 whitespace-nowrap shadow-md sm:shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center"
                  disabled={isLoading}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  {isLoading ? "Subscribing..." : content.newsletter.buttonText}
                </Button>
              </div>
            </form>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
              {["Weekly Updates", "Exclusive Offers", "Eco Tips"].map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-2 rounded-full shadow-sm border border-primary/20 backdrop-blur-sm transition-all hover:bg-primary-light/30"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-primary flex items-center justify-center rounded-full shadow-md flex-shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
