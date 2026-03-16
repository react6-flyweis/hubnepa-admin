import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { User } from "@/types/user"
import { cn } from "@/lib/utils"

const blockUserSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
})

type BlockUserValues = z.infer<typeof blockUserSchema>

const blockReasons = [
  "Suspicious Activity",
  "Non payment",
  "Violation of Terms",
  "Other",
] as const

export type BlockUserMode = "block" | "unblock"

interface BlockUserDialogProps {
  open: boolean
  user?: User | null
  mode: BlockUserMode
  onClose: () => void
  onConfirm: (user: User, reason?: string) => void
}

export function BlockUserDialog({
  open,
  user,
  mode,
  onClose,
  onConfirm,
}: BlockUserDialogProps) {
  const form = useForm<BlockUserValues>({
    resolver: zodResolver(blockUserSchema),
    defaultValues: {
      reason: blockReasons[0],
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({ reason: blockReasons[0] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!user) return null

  const isBlocking = mode === "block"

  const title = isBlocking ? "Block User Access" : "Unblock User Access"
  const description = isBlocking
    ? `Are you sure you want to block ${user.name}? They will no longer be able to sign in or place orders.`
    : `Are you sure you want to unblock ${user.name}? They will be able to sign in and place orders again.`

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="bg-[#F8FAFC] sm:max-w-lg">
        <DialogHeader className="gap-0">
          <DialogTitle className="font-display text-lg font-semibold text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit((values) => {
            onConfirm(user, values.reason)
          })}
          className="space-y-44"
        >
          {isBlocking && (
            <Field>
              <FieldLabel htmlFor="reason">Reason for blocking</FieldLabel>
              <Select
                value={form.watch("reason")}
                onValueChange={(value) => form.setValue("reason", value)}
              >
                <SelectTrigger
                  id="reason"
                  className="mt-1 w-full"
                  size="default"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {blockReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[form.formState.errors.reason]} />
            </Field>
          )}

          <DialogFooter className="flex justify-end gap-2 border-t-0 bg-transparent">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className={cn(isBlocking && "bg-red-600")}>
              {isBlocking ? "Block User" : "Unblock User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
