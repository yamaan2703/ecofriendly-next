"use client";

import toast from "react-hot-toast";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  const showToast = (options: ToastOptions | string) => {
    if (typeof options === "string") {
      toast(options);
      return;
    }

    const { title, description, variant = "default", duration = 3000 } = options;

    // Combine title and description for the message
    const message = title && description 
      ? `${title}: ${description}` 
      : description || title || "Notification";

    if (variant === "destructive") {
      toast.error(message, {
        duration,
      });
    } else {
      toast.success(message, {
        duration,
      });
    }
  };

  return {
    toast: showToast,
  };
}

