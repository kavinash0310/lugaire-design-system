"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, type Product } from "@/lib/products"
import { useWishlist } from "@/components/site/wishlist-provider"
import { toast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/modal"

export function QuickView({
  product,
  children,
}: {
  product: Product
  children: React.ReactNode
}) {
  return (
    <Modal>
      <ModalTrigger render={children as React.ReactElement} />
      <ModalContent
        showClose
        className="max-w-4xl p-0 overflow-hidden"
      >
        <QuickViewBody product={product} />
      </ModalContent>
    </Modal>
  )
}

function QuickViewBody({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = React.useState(0)
  const [color, setColor] = React.useState(product.colors[0]?.name)
  const [size, setSize] = React.useState<string | null>(null)
  const [qty, setQty] = React.useState(1)
  const { has, toggle } = useWishlist()
  const wished = has(product.id)

  return (
    <div className="grid max-h-[86vh] grid-cols-1 overflow-y-auto md:max-h-[80vh] md:grid-cols-2">
      {/* Image stack */}
      <div className="relative flex flex-col gap-3 bg-secondary/40 p-4 sm:p-5">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl)] border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={`${product.name} — view ${activeImage + 1}`}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-3 top-3 font-mono text-[0.65rem] text-primary-foreground/90 mix-blend-difference">
            {String(activeImage + 1).padStart(2, "0")} /{" "}
            {String(product.images.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          {product.images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] border transition-all",
                i === activeImage
                  ? "border-copper ring-1 ring-copper"
                  : "border-border opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              {product.collection}
            </Badge>
            <span className="font-mono text-[0.7rem] text-muted-foreground">
              {product.sku}
            </span>
          </div>
          <h2 className="font-display text-3xl leading-tight tracking-tight text-balance">
            {product.name}
          </h2>
          <p className="text-sm text-muted-foreground italic">{product.line}</p>
        </div>

        <p className="text-2xl">{formatPrice(product.price)}</p>

        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {product.note}
        </p>

        {/* Color */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-eyebrow text-muted-foreground">Colour</span>
            <span className="text-sm">{color}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                aria-pressed={color === c.name}
                className={cn(
                  "size-8 rounded-full border transition-all",
                  color === c.name
                    ? "ring-2 ring-copper ring-offset-2 ring-offset-card"
                    : "ring-0 hover:scale-110",
                )}
                style={{ backgroundColor: c.hex, borderColor: "var(--border)" }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-eyebrow text-muted-foreground">Size</span>
            <button className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Size guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  "flex h-10 min-w-11 items-center justify-center rounded-[var(--radius-md)] border px-3 text-sm transition-all",
                  size === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + actions */}
        <div className="mt-1 flex items-center gap-3">
          <div className="flex items-center rounded-[var(--radius-md)] border border-border">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="flex size-10 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <Button
            variant="copper"
            className="flex-1"
            onClick={() =>
              toast.success("Added to bag", {
                description: `${product.name}${size ? ` · Size ${size}` : ""}`,
              })
            }
          >
            <ShoppingBag className="size-4" />
            Add to bag
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
          >
            <Heart
              className={cn("size-4", wished && "fill-copper text-copper")}
            />
          </Button>
        </div>

        <div className="mt-1 flex flex-col gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{product.material}</span>
          <span>Complimentary shipping and returns worldwide.</span>
        </div>
      </div>
    </div>
  )
}
