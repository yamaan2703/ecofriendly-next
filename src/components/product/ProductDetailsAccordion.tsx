"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionBenefit {
  title: string;
  description: string;
}

interface AccordionMaterialRow {
  component: string;
  material: string;
}

export interface ProductDetailsAccordionData {
  whatYouGet: {
    title: string;
    items: string[];
  };
  benefits: {
    title: string;
    items: AccordionBenefit[];
  };
  instructions: {
    title: string;
    steps: string[];
  };
  materials: {
    title: string;
    rows: AccordionMaterialRow[];
  };
}

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({ title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="border-t border-foreground/15">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
      >
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:text-[13px]">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductDetailsAccordionProps {
  data: ProductDetailsAccordionData;
}

export function ProductDetailsAccordion({ data }: ProductDetailsAccordionProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(["whatYouGet", "benefits"])
  );

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="mt-2 border-b border-foreground/15">
      <AccordionItem
        title={data.whatYouGet.title}
        isOpen={openSections.has("whatYouGet")}
        onToggle={() => toggleSection("whatYouGet")}
      >
        <ul className="space-y-2">
          {data.whatYouGet.items.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
            >
              {item}
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem
        title={data.benefits.title}
        isOpen={openSections.has("benefits")}
        onToggle={() => toggleSection("benefits")}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {data.benefits.items.map((item) => (
            <p
              key={item.title}
              className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
            >
              {item.title}
            </p>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        title={data.instructions.title}
        isOpen={openSections.has("instructions")}
        onToggle={() => toggleSection("instructions")}
      >
        <ol className="space-y-2">
          {data.instructions.steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
            >
              <span className="font-medium text-foreground">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </AccordionItem>

      <AccordionItem
        title={data.materials.title}
        isOpen={openSections.has("materials")}
        onToggle={() => toggleSection("materials")}
      >
        <div className="space-y-3">
          {data.materials.rows.map((row) => (
            <div
              key={row.component}
              className="grid grid-cols-1 gap-1 border-b border-foreground/10 pb-3 last:border-b-0 last:pb-0 sm:grid-cols-2 sm:gap-4"
            >
              <span className="text-sm font-medium text-foreground sm:text-[15px]">
                {row.component}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {row.material}
              </span>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}
