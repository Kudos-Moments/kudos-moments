"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { cx } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={item.question} className="border-b border-border">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-[16px] font-semibold text-text-primary font-sans">
                {item.question}
              </span>
              <IconChevronDown
                size={18}
                className={cx(
                  "shrink-0 text-text-secondary transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <p
                id={panelId}
                className="pb-5 text-[15px] text-text-secondary leading-[1.6] animate-fade-in"
              >
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
