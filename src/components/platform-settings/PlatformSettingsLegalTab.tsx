import { ExternalLink, History, Info, Save } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import LegalDocumentEditor from "./LegalDocumentEditor"

const legalDocuments = [
  {
    id: "terms",
    label: "Terms of Service",
    lastUpdated: "Oct 12, 2024",
    content: `## Terms of Service

Last Updated: October 12, 2024

### 1. Introduction
Welcome to HUBNEPA! By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.

### 2. User Accounts
To access certain features, you must create an account. You agree to provide accurate, current, and complete information and to keep this information up to date. You are responsible for maintaining the confidentiality of your account credentials.

### 3. Orders and Payments
- **Pricing:** All prices are listed in US Dollars (USD) unless otherwise stated.
- **Payment:** We accept major credit cards, PayPal, and Cash on Delivery (where applicable).
- **Cancellations:** Orders may be cancelled within 5 minutes of placement without penalty.

### 4. Delivery
We aim to deliver within the estimated timeframes, but delays may occur due to traffic, weather, or other unforeseen circumstances.

### 5. Prohibited Conduct
You agree not to use the service for any unlawful purpose or to violate any laws in your jurisdiction.

### 6. Limitation of Liability
HUBNEPA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.`,
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    lastUpdated: "Oct 10, 2024",
    content: `## Privacy Policy

Last Updated: October 10, 2024

### 1. Information We Collect
We collect information you provide directly to us, such as when you create an account, place an order, or contact support. This includes:
- Name, email address, and phone number
- Delivery address
- Payment information

### 2. How We Use Your Information
We use your information to:
- Process and deliver your orders
- Communicate with you about your account and orders
- Send you promotional offers (if you opted in)
- Improve our platform and services

### 3. Data Sharing
We share your delivery information with our restaurant partners and delivery drivers solely for the purpose of fulfilling your order. We do not sell your personal data to third parties.

### 4. Security
We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure.

### 5. Your Rights
You have the right to access, correct, or delete your personal information. Contact privacy@hubnepa.com for assistance.`,
  },
  {
    id: "refund",
    label: "Refund Policy",
    lastUpdated: "Sep 15, 2024",
    content: `## Refund Policy

Last Updated: September 15, 2024

### 1. Eligibility for Refunds
You may be eligible for a refund if:
- The wrong item was delivered.
- The item arrived damaged or spoiled.
- The order was never delivered.
- Significant items were missing from your order.

### 2. Request Process
To request a refund, please contact support within 24 hours of the delivery time. Please provide photos of the issue where applicable.

### 3. Processing Time
Approved refunds are processed within 5-7 business days and credited back to the original payment method.

### 4. Non-Refundable Items
- Orders cancelled after the restaurant has started preparation.
- Issues due to incorrect delivery address provided by the user.
- Taste preference complaints.`,
  },
  {
    id: "vendor",
    label: "Vendor Agreement",
    lastUpdated: "Aug 01, 2024",
    content: `## Vendor Agreement

Last Updated: August 01, 2024

### 1. Partnership Scope
This agreement governs the relationship between HUBNEPA ("Platform") and the Restaurant/Retailer ("Vendor") for the sale of goods via the Platform.

### 2. Commission & Fees
- **Commission Rate:** The Platform charges a 10% commission on the subtotal of all orders.
- **Payouts:** Settlements are processed weekly on Mondays for the previous week's sales, net of commission.

### 3. Vendor Responsibilities
- Maintain accurate menu/product pricing and availability.
- Prepare orders promptly and to high quality standards.
- Comply with all local health and safety regulations.

### 4. Quality Standards
Vendors must maintain a minimum rating of 3.5 stars. Vendors consistently falling below this threshold may be suspended.

### 5. Termination
Either party may terminate this agreement with 30 days written notice. Immediate termination may occur in cases of serious breach of contract or safety violations.`,
  },
] as const

type LegalDocumentId = (typeof legalDocuments)[number]["id"]

function getDocumentDefaults() {
  return legalDocuments.reduce(
    (accumulator, document) => {
      accumulator[document.id] = document.content
      return accumulator
    },
    {} as Record<LegalDocumentId, string>
  )
}

function PlatformSettingsLegalTab() {
  const [activeDocumentId, setActiveDocumentId] = useState<LegalDocumentId>(
    legalDocuments[0].id
  )
  const [documentContents, setDocumentContents] = useState(() =>
    getDocumentDefaults()
  )

  const activeDocument =
    legalDocuments.find((document) => document.id === activeDocumentId) ??
    legalDocuments[0]

  function handleDocumentContentChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDocumentContents((current) => ({
      ...current,
      [activeDocument.id]: event.target.value,
    }))
  }

  return (
    <Card className="rounded-2xl border border-slate-200 py-0 ring-0">
      <CardHeader className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="font-display text-2xl leading-none font-semibold text-slate-900">
              Legal Documents & Policies
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Manage terms of service, privacy policy, and agreements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-8 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            >
              <History className="h-4 w-4" />
              View History
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-8 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            >
              <ExternalLink className="h-4 w-4" />
              Preview Live
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-5 sm:pb-6">
        <div className="overflow-x-auto border-y border-slate-200 bg-slate-50">
          <div className="flex min-w-max items-center justify-center">
            {legalDocuments.map((document) => (
              <button
                key={document.id}
                type="button"
                className={cn(
                  "h-12 border-r border-slate-200 px-6 text-sm font-semibold text-slate-500 transition-colors",
                  document.id === activeDocument.id
                    ? "bg-white text-slate-900"
                    : "bg-slate-50 hover:text-slate-700"
                )}
                onClick={() => setActiveDocumentId(document.id)}
              >
                {document.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2.5">
            <Badge className="h-6 rounded-full border border-emerald-200 bg-emerald-100 px-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100">
              Live Version 2.4
            </Badge>
            <p className="text-sm text-slate-500">
              Last updated: {activeDocument.lastUpdated}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-400 italic">All changes saved</p>
            <Button
              type="button"
              className="h-8 bg-emerald-600 px-3.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Save className="h-4 w-4" />
              Publish Update
            </Button>
          </div>
        </div>

        <div className="space-y-4 px-5">
          <LegalDocumentEditor
            content={documentContents[activeDocument.id]}
            onChange={handleDocumentContentChange}
          />

          <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-blue-700">
                Legal Disclaimer
              </p>
              <p className="mt-1 text-sm text-blue-600">
                Changes to these documents constitute a binding agreement
                update. Ensure all content is reviewed by legal counsel before
                publishing. Users may be required to re-accept terms upon major
                updates.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlatformSettingsLegalTab
