"use client"

import * as React from "react"
import { Bell, PackageOpen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Field, Input, Label } from "@/components/ui/input"

export function OverlayDemos() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Modal */}
      <Modal>
        <ModalTrigger render={<Button variant="outline" />}>
          Open modal
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Private preview access</ModalTitle>
            <ModalDescription>
              Request an invitation to the Autumn atelier showing. Seats are
              limited and allocated by hand.
            </ModalDescription>
          </ModalHeader>
          <div className="mt-6 flex flex-col gap-4">
            <Field>
              <Label htmlFor="modal-name">Full name</Label>
              <Input id="modal-name" placeholder="Amara Okafor" />
            </Field>
            <Field>
              <Label htmlFor="modal-email">Email</Label>
              <Input id="modal-email" type="email" placeholder="you@studio.com" />
            </Field>
          </div>
          <ModalFooter>
            <ModalClose render={<Button variant="ghost" />}>Cancel</ModalClose>
            <ModalClose
              render={<Button variant="copper" />}
              onClick={() => toast.success("Request received", {
                description: "We will be in touch within two business days.",
              })}
            >
              Request invitation
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Destructive confirm modal */}
      <Modal>
        <ModalTrigger render={<Button variant="outline" />}>
          <Trash2 className="size-4" />
          Confirm dialog
        </ModalTrigger>
        <ModalContent className="max-w-md">
          <ModalHeader>
            <ModalTitle>Remove from archive?</ModalTitle>
            <ModalDescription>
              This piece will be permanently removed from your saved archive.
              This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose render={<Button variant="ghost" />}>Keep it</ModalClose>
            <ModalClose
              render={<Button variant="destructive" />}
              onClick={() => toast("Removed from archive")}
            >
              Remove
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Drawer */}
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          Open drawer
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Your bag</DrawerTitle>
            <DrawerDescription>Two pieces reserved for you.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-4">
            {[
              { name: "The Overcoat", detail: "Charcoal wool · 50", price: "$1,480" },
              { name: "Merino Roll Neck", detail: "Bone · M", price: "$320" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-border p-4"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="font-mono text-sm">{item.price}</span>
              </div>
            ))}
          </DrawerBody>
          <DrawerFooter className="flex-col items-stretch gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono">$1,800</span>
            </div>
            <DrawerClose
              render={<Button variant="copper" className="w-full" />}
              onClick={() => toast.success("Proceeding to checkout")}
            >
              Checkout
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function ToastDemos() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast("Added to your archive")}>
        <Bell className="size-4" />
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.success("Order confirmed", {
            description: "Estimated delivery in 3–5 days.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error("Payment declined", {
            description: "Please try a different method.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast("Item back in stock", {
            icon: <PackageOpen className="size-4" />,
            action: {
              label: "View",
              onClick: () => toast("Opening product"),
            },
          })
        }
      >
        With action
      </Button>
    </div>
  )
}
