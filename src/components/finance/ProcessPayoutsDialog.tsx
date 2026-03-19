import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProcessPayoutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  totalPartners: number
  totalAmount: number
  onConfirm: () => void
}

export function ProcessPayoutsDialog({
  open,
  onOpenChange,
  totalPartners,
  totalAmount,
  onConfirm,
}: ProcessPayoutsDialogProps) {
  const formattedAmount = `$${totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full overflow-x-hidden overflow-y-auto sm:max-w-lg">
        <DialogHeader className="gap-0">
          <DialogTitle className="font-display text-lg font-semibold text-slate-900">
            Process Weekly Payouts
          </DialogTitle>
          <DialogDescription className="font-serif text-sm text-slate-500">
            This will initiate bank transfers for all pending settlements.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">
                  Total Partners
                </p>
                <p className="text-base font-semibold text-slate-900">
                  {totalPartners}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-emerald-700">
                  Total Amount
                </p>
                <p className="text-base font-semibold text-emerald-900">
                  {formattedAmount}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
            <p className="text-sm font-medium text-amber-900">
              Transactions cannot be reversed once initiated. Please verify the
              amount before proceeding.
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 border-0 bg-transparent">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9"
          >
            Cancel
          </Button>
          <Button
            className="h-9 bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Confirm Payouts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
