"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { home1Content } from "@/data/home1-content";
import { home2Content } from "@/data/home2-content";

type ContentType = typeof home1Content;

interface ContentContextType {
  content: ContentType;
  currentPage: "home1" | "home2";
  switchToHome1: () => void;
  switchToHome2: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [currentPage, setCurrentPage] = useState<"home1" | "home2">("home1");

  const content = currentPage === "home1" ? home1Content : home2Content;

  const switchToHome1 = () => {
    console.log("ContentContext: Switching to home1 (toothbrush)");
    setCurrentPage("home1");
  };
  const switchToHome2 = () => {
    console.log("ContentContext: Switching to home2 (dishwasher)");
    setCurrentPage("home2");
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        currentPage,
        switchToHome1,
        switchToHome2,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}

