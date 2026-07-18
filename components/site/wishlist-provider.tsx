"use client"

import * as React from "react"

type WishlistContextValue = {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
  count: number
}

const WishlistContext = React.createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = React.useState<string[]>([])

  const toggle = React.useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const value = React.useMemo<WishlistContextValue>(
    () => ({
      ids,
      has: (id: string) => ids.includes(id),
      toggle,
      count: ids.length,
    }),
    [ids, toggle],
  )

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = React.useContext(WishlistContext)
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return ctx
}
