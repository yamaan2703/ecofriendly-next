"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main product page
    router.replace("/product/bamboo-toothbrush-10-pack");
  }, [router]);

  // Show logo while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <img
          src="/images/ecofriendly_dark.png"
          alt="EcoFriendly"
          className="h-20 w-auto mx-auto"
        />
      </div>
    </div>
  );
}
