"use client"

import * as React from "react"
import { UserPlus, Check } from "lucide-react"
import { SettingsCard } from "@/components/admin/settings-section"
import { StatusBadge } from "@/components/admin/status-badge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input, Label, Field } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal"
import { toast } from "@/components/ui/toast"
import { ADMIN_USERS, ADMIN_ROLES } from "@/lib/mock/admin"

export default function UsersRolesPage() {
  const [open, setOpen] = React.useState(false)

  function onInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
    toast.success("Invitation sent")
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsCard title="Team members" description="People with access to the admin console.">
        <div className="flex justify-end">
          <Button variant="copper" size="sm" onClick={() => setOpen(true)}>
            <UserPlus className="size-4" />
            Invite member
          </Button>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ADMIN_USERS.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={u.avatar} name={u.name} size={36} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{u.name}</span>
                        <span className="text-xs text-muted-foreground">{u.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={u.status} />
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{u.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SettingsCard>

      <SettingsCard title="Roles & permissions" description="What each role can access in the console.">
        <div className="grid gap-4 sm:grid-cols-2">
          {ADMIN_ROLES.map((r) => (
            <div key={r.role} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-border p-4">
              <div className="flex flex-col gap-1">
                <p className="font-medium">{r.role}</p>
                <p className="text-xs text-muted-foreground text-pretty">{r.description}</p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {r.permissions.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="size-3.5 text-copper" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SettingsCard>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Invite team member</ModalTitle>
            <ModalDescription>They&apos;ll receive an email to set up their account.</ModalDescription>
          </ModalHeader>
          <form onSubmit={onInvite} className="mt-6 flex flex-col gap-5">
            <Field>
              <Label htmlFor="invite-email">Email</Label>
              <Input id="invite-email" type="email" required placeholder="name@lugaire.com" />
            </Field>
            <Field>
              <Label htmlFor="invite-role">Role</Label>
              <Select id="invite-role" defaultValue="Editor">
                {ADMIN_ROLES.map((r) => (
                  <option key={r.role}>{r.role}</option>
                ))}
              </Select>
            </Field>
            <ModalFooter>
              <ModalClose render={<Button type="button" variant="ghost" />}>Cancel</ModalClose>
              <Button type="submit" variant="copper">
                Send invitation
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}
