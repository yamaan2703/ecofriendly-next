"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToSignup = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  const handleAuthSuccess = () => {
    // Handle successful authentication
    console.log("Authentication successful!");
    // You can redirect to dashboard or home page here
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Login
              onSwitchToSignup={handleSwitchToSignup}
              onLoginSuccess={handleAuthSuccess}
            />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Signup
              onSwitchToLogin={handleSwitchToLogin}
              onSignupSuccess={handleAuthSuccess}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
