"use client"

import * as React from "react"

/**
 * Tracks recently-viewed product IDs for the "Recently Viewed" rail.
 * This is ephemeral browsing convenience — not application data — so it lives
 * in the browser via localStorage with a small, capped history.
 */
const KEY = "lugaire:recently-viewed"
const LIMIT = 8

function read(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Records `currentId` as viewed and returns the prior history (excluding the
 * current product) so a page can render what came before this visit.
 */
export function useRecentlyViewed(currentId: string): string[] {
  const [history, setHistory] = React.useState<string[]>([])

  React.useEffect(() => {
    const prior = read().filter((id) => id !== currentId)
    setHistory(prior)

    const next = [currentId, ...prior].slice(0, LIMIT)
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable — non-critical */
    }
  }, [currentId])

  return history
}
