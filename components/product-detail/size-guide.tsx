"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalTrigger,
} from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import type { Size } from "@/lib/products"

/** Chest / waist measurements (cm) per size — house standard. */
const CHART: Record<Size, { chest: number; waist: number; length: number }> = {
  XS: { chest: 96, waist: 78, length: 68 },
  S: { chest: 100, waist: 82, length: 70 },
  M: { chest: 104, waist: 86, length: 72 },
  L: { chest: 110, waist: 92, length: 74 },
  XL: { chest: 116, waist: 98, length: 76 },
  XXL: { chest: 122, waist: 104, length: 78 },
}

const ROWS: { key: keyof (typeof CHART)["M"]; label: string }[] = [
  { key: "chest", label: "Chest" },
  { key: "waist", label: "Waist" },
  { key: "length", label: "Length" },
]

export function SizeGuide({
  sizes,
  highlight,
  children,
}: {
  sizes: Size[]
  highlight?: string | null
  children: React.ReactNode
}) {
  return (
    <Modal>
      <ModalTrigger render={children as React.ReactElement} />
      <ModalContent className="max-w-2xl">
        <ModalHeader>
          <ModalTitle>Size Guide</ModalTitle>
          <ModalDescription>
            Measurements in centimetres, taken flat and doubled. If you are between
            sizes, the house recommends sizing up for a softer line.
          </ModalDescription>
        </ModalHeader>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Size
                </th>
                {sizes.map((s) => (
                  <th
                    key={s}
                    className={cn(
                      "py-3 text-center text-xs font-medium transition-colors",
                      highlight === s ? "text-copper" : "text-foreground",
                    )}
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <motion.tr
                  key={row.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: ri * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border/60"
                >
                  <td className="py-3 text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {row.label}
                  </td>
                  {sizes.map((s) => (
                    <td
                      key={s}
                      className={cn(
                        "py-3 text-center tabular-nums transition-colors",
                        highlight === s
                          ? "font-medium text-copper"
                          : "text-muted-foreground",
                      )}
                    >
                      {CHART[s][row.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Still unsure? Our atelier reads every message personally — write to
          concierge@lugaire.house for a fit recommendation.
        </p>
      </ModalContent>
    </Modal>
  )
}
