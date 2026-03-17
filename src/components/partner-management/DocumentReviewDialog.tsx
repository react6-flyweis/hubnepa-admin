import { CircleCheck, CircleX, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { PartnerDocument } from "@/types/partner"

export interface DocumentReviewDialogProps {
  document: PartnerDocument
  previewImageSrc: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentReviewDialog({
  document,
  previewImageSrc,
  open,
  onOpenChange,
}: DocumentReviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded p-0 sm:max-w-lg"
      >
        {/* Header */}
        <DialogHeader className="flex-row justify-between border-b p-4">
          <div>
            <DialogTitle className="font-display text-[1.15rem] leading-tight font-semibold text-slate-900">
              {document.title}
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-[0.9rem] text-slate-500">
              Uploaded on {document.submittedAt}
              <span className="mx-1.5 text-slate-400">•</span>
              {document.fileSize}
            </DialogDescription>
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 rounded-lg text-[0.9rem] font-medium"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <CircleX className="size-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="bg-gray-100 py-6">
          {/* Preview */}
          <div className="mx-5 overflow-hidden rounded-xl bg-slate-100">
            <img
              src={previewImageSrc}
              alt={document.title}
              className="h-56 w-full object-cover"
            />
          </div>
        </div>

        {/* Actions */}
        <DialogFooter className="flex items-center gap-3 px-5 pt-4 pb-6">
          <Button variant="destructive">
            <CircleX className="h-4 w-4" />
            Reject Document
          </Button>
          <Button className="">
            <CircleCheck className="h-4 w-4" />
            Approve &amp; Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
