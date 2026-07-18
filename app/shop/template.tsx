"use client"

import { motion } from "motion/react"

/**
 * Route-level entrance transition for the Shop. A template re-mounts on every
 * navigation, so this gives the catalogue a quiet fade-and-rise as it opens
 * without altering any of the underlying layout.
 */
export default function ShopTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
