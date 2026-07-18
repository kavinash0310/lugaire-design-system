"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export type AccordionItemData = {
  question: string
  answer: React.ReactNode
}

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: AccordionItemData
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left outline-none focus-visible:text-copper"
      >
        <span className="font-display text-lg leading-snug text-balance">{item.question}</span>
        <Plus
          className={cn(
            "size-5 shrink-0 text-copper transition-transform duration-[var(--duration-base)] ease-[var(--ease-luxe)]",
            open && "rotate-45",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground text-pretty">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Accordion({
  items,
  className,
}: {
  items: AccordionItemData[]
  className?: string
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
        />
      ))}
    </div>
  )
}
