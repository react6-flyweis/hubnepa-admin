import type {
  Partner,
  PartnerDocument,
  PartnerVerification,
} from "@/types/partner"

type PartnerDocumentTemplate = Omit<
  PartnerDocument,
  "id" | "partnerId" | "status"
> & {
  key: string
}

const baseDocumentTemplates = [
  {
    key: "business-license",
    title: "Business License",
    fileType: "PDF",
    fileSize: "2.4 MB",
    submittedAt: "Feb 10, 2026",
    preview: "calculator",
  },
  {
    key: "tax",
    title: "Tax",
    fileType: "Image",
    fileSize: "1.1 MB",
    submittedAt: "Feb 10, 2026",
    preview: "paperwork",
  },
  {
    key: "food",
    title: "Food",
    fileType: "PDF",
    fileSize: "3.2 MB",
    submittedAt: "Feb 11, 2026",
    preview: "calculator",
  },
] as const satisfies ReadonlyArray<PartnerDocumentTemplate>

const defaultStatusSequenceMap: Record<
  PartnerVerification,
  PartnerVerification[]
> = {
  Verified: ["Verified", "Verified", "Pending Review"],
  "Pending Review": ["Pending Review", "Verified", "Rejected"],
  Rejected: ["Rejected", "Pending Review", "Rejected"],
}

const partnerStatusOverrides: Record<string, PartnerVerification[]> = {
  "RES-001": ["Pending Review", "Verified", "Rejected"],
}

export function getPartnerDocuments(partner: Partner): PartnerDocument[] {
  const statuses =
    partnerStatusOverrides[partner.id] ??
    defaultStatusSequenceMap[partner.verification]

  return baseDocumentTemplates.map((template, index) => ({
    ...template,
    id: `${partner.id}-${template.key}`,
    partnerId: partner.id,
    status: statuses[index] ?? partner.verification,
  }))
}
