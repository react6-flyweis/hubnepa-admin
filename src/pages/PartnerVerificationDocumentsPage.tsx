import { useState } from "react"
import { ArrowLeft, CalendarDays, FileText } from "lucide-react"
import { Link, useParams } from "react-router"

import docImageOne from "@/assets/doc-1.jpg"
import docImageTwo from "@/assets/doc-2.jpg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DocumentReviewDialog } from "@/components/partner-management/DocumentReviewDialog"
import { getPartnerDocuments } from "@/data/partnerDocuments"
import { partners } from "@/data/partners"
import { cn } from "@/lib/utils"
import type { PartnerDocument, PartnerVerification } from "@/types/partner"

const documentStatusMap: Record<
  PartnerVerification,
  { label: string; className: string }
> = {
  Verified: {
    label: "Verified",
    className: "bg-emerald-100 text-emerald-700",
  },
  "Pending Review": {
    label: "Pending",
    className: "bg-amber-100 text-amber-700",
  },
  Rejected: {
    label: "Rejected",
    className: "bg-rose-100 text-rose-700",
  },
}

export default function PartnerVerificationDocumentsPage() {
  const { partnerId } = useParams<{ partnerId: string }>()

  const partner = partners.find((item) => item.id === partnerId)

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-gray-700">Partner not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          No partner with ID &quot;{partnerId}&quot; exists.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/partners">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partners
          </Link>
        </Button>
      </div>
    )
  }

  const documents = getPartnerDocuments(partner)

  return (
    <div className="max-w-226 pb-10">
      <div className="flex items-start gap-2.5">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="mt-1 rounded-full text-slate-800 hover:bg-white"
        >
          <Link to={`/partners/${partner.id}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to partner details</span>
          </Link>
        </Button>

        <div>
          <h1 className="font-display text-3xl leading-none font-semibold text-slate-900">
            Verification Documents
          </h1>
          <p className="mt-1.5">
            Review and approve documents for{" "}
            <span className="text-slate-900">{partner.businessName}</span>
          </p>
        </div>
      </div>

      <div className="mt-8 grid w-fit grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => (
          <VerificationDocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  )
}

function VerificationDocumentCard({ document }: { document: PartnerDocument }) {
  const [open, setOpen] = useState(false)
  const status = documentStatusMap[document.status]
  const previewImageSrc =
    document.preview === "paperwork" ? docImageOne : docImageTwo

  return (
    <>
      <Card className="w-full max-w-[17.35rem] overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white py-0 shadow-[0_2px_12px_rgba(15,23,42,0.08)] ring-0">
        <div className="relative h-[11.6rem] overflow-hidden rounded-t-[1.1rem] bg-slate-200">
          <img
            src={previewImageSrc}
            alt={document.title}
            className="h-full w-full object-cover"
          />
          <Badge
            className={cn(
              "absolute top-3.5 right-3.5 h-7 rounded-full px-3.5 text-[0.92rem] font-semibold shadow-sm",
              status.className
            )}
          >
            {status.label}
          </Badge>
        </div>

        <CardContent className="px-5 py-5">
          <div className="flex items-start gap-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FileText className="size-6" strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h2 className="font-display text-[1.15rem] leading-tight font-semibold text-slate-900 sm:text-[1.3rem]">
                {document.title}
              </h2>
              <p className="mt-1 text-[0.95rem] text-slate-500">
                {document.fileType}
                <span className="mx-2 text-slate-400">•</span>
                {document.fileSize}
              </p>
            </div>
          </div>
        </CardContent>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-[0.96rem]">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4" />
            <span>{document.submittedAt}</span>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="h-auto px-0 text-[0.98rem] font-medium text-slate-900 hover:bg-transparent hover:text-slate-900"
            onClick={() => setOpen(true)}
          >
            Review
          </Button>
        </div>
      </Card>

      <DocumentReviewDialog
        document={document}
        previewImageSrc={previewImageSrc}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
