import { useMemo, useState } from "react"
import {
  BarChart3,
  Check,
  Circle,
  Download,
  Filter,
  Search,
  X,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type FeedbackType = "Complaint" | "Feedback"
type CaseStatus =
  | "Open"
  | "In Review"
  | "Resolved"
  | "Investigation"
  | "Rejected"
type MetricTone = "total" | "open" | "review" | "resolved" | "rejected"

interface FeedbackCase {
  complaintId: string
  orderId: string
  customer: string
  vendor: string
  type: FeedbackType
  category: string
  description: string
  date: string
  status: CaseStatus
}

interface MetricCard {
  label: string
  value: string
  tone: MetricTone
  icon: LucideIcon
}

const metricColorMap: Record<
  MetricTone,
  {
    iconContainer: string
    icon: string
  }
> = {
  total: {
    iconContainer: "bg-slate-100",
    icon: "text-sky-600",
  },
  open: {
    iconContainer: "bg-red-50",
    icon: "text-rose-500",
  },
  review: {
    iconContainer: "bg-slate-100",
    icon: "text-slate-500",
  },
  resolved: {
    iconContainer: "bg-emerald-50",
    icon: "text-emerald-600",
  },
  rejected: {
    iconContainer: "bg-red-50",
    icon: "text-red-500",
  },
}

const typeColorMap: Record<FeedbackType, string> = {
  Complaint: "border-red-200 bg-red-50 text-red-600",
  Feedback: "border-blue-200 bg-blue-50 text-blue-600",
}

const statusColorMap: Record<CaseStatus, string> = {
  Open: "border-red-200 bg-red-100 text-red-700",
  "In Review": "border-orange-200 bg-orange-100 text-orange-700",
  Resolved: "border-emerald-200 bg-emerald-100 text-emerald-700",
  Investigation: "border-blue-200 bg-blue-100 text-blue-700",
  Rejected: "border-red-200 bg-red-100 text-red-700",
}

const metricCards: MetricCard[] = [
  { label: "Total Cases", value: "1,248", tone: "total", icon: BarChart3 },
  { label: "Open", value: "89", tone: "open", icon: Circle },
  { label: "In Review", value: "156", tone: "review", icon: Search },
  { label: "Resolved", value: "982", tone: "resolved", icon: Check },
  { label: "Rejected", value: "21", tone: "rejected", icon: X },
]

const feedbackCases: FeedbackCase[] = [
  {
    complaintId: "COMP-001",
    orderId: "ORD-9921",
    customer: "John Doe",
    vendor: "Spicy Kitchen",
    type: "Complaint",
    category: "Late Delivery",
    description: "Order was delayed by 45 minutes.",
    date: "Feb 18, 2026",
    status: "Open",
  },
  {
    complaintId: "COMP-002",
    orderId: "ORD-9856",
    customer: "Sarah Connor",
    vendor: "Fresh Mart",
    type: "Complaint",
    category: "Wrong Item",
    description: "Received incorrect items in the order.",
    date: "Feb 18, 2026",
    status: "In Review",
  },
  {
    complaintId: "COMP-003",
    orderId: "ORD-9745",
    customer: "Mike Ross",
    vendor: "Burger King Clone",
    type: "Feedback",
    category: "Excellent Service",
    description: "Amazing service. Food arrived fresh and hot!",
    date: "Feb 17, 2026",
    status: "Resolved",
  },
  {
    complaintId: "COMP-004",
    orderId: "ORD-9632",
    customer: "Emily Davis",
    vendor: "Pizza Paradise",
    type: "Complaint",
    category: "Food Quality",
    description: "The pizza was undercooked and too oily.",
    date: "Feb 17, 2026",
    status: "Investigation",
  },
  {
    complaintId: "COMP-005",
    orderId: "ORD-9521",
    customer: "David Wilson",
    vendor: "Quick Grocery",
    type: "Complaint",
    category: "Damaged Product",
    description: "Product packaging was torn at delivery.",
    date: "Feb 16, 2026",
    status: "In Review",
  },
]

export default function FeedbackComplaintsPage() {
  const [search, setSearch] = useState("")

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return feedbackCases
    }

    return feedbackCases.filter((feedbackCase) =>
      [
        feedbackCase.complaintId,
        feedbackCase.orderId,
        feedbackCase.customer,
        feedbackCase.vendor,
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [search])

  return (
    <div className="space-y-4">
      <PageHeader
        title="Feedback & Complaints"
        description="Review customer feedback and resolve complaints efficiently"
        right={
          <Button
            variant="outline"
            size="lg"
            className="h-10 gap-2 bg-white px-4 font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metricCards.map((metric) => {
          const colors = metricColorMap[metric.tone]
          const Icon = metric.icon

          return (
            <Card
              key={metric.label}
              size="sm"
              className="rounded-xl border border-slate-200 bg-white py-2 shadow-sm"
            >
              <CardContent className="px-4 py-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-800">
                      {metric.value}
                    </p>
                  </div>

                  <Icon className={cn("size-4", colors.icon)} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-3xl">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by Complaint ID, Order ID, Customer, Vendor..."
            className="h-10 border-slate-200 bg-white pl-9 text-sm shadow-none placeholder:text-slate-400"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <Button
          variant="outline"
          size="lg"
          className="h-10 gap-2 self-end border-slate-200 bg-white px-4 text-slate-700 hover:bg-slate-50 sm:self-auto"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card className="gap-0 border border-slate-200 py-0 shadow-sm">
        <CardContent className="px-0 pb-0">
          <Table className="">
            <TableHeader className="bg-slate-50 [&_tr]:border-slate-200">
              <TableRow className="hover:bg-slate-50">
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Complaint ID
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Order ID
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Customer
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Vendor
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Type
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Category
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Description
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Date
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr]:border-slate-200 [&_tr:last-child]:border-b">
              {filteredCases.map((feedbackCase) => (
                <TableRow
                  key={feedbackCase.complaintId}
                  className="hover:bg-slate-50"
                >
                  <TableCell className="px-4 py-4 text-sm font-semibold whitespace-normal text-slate-700">
                    {feedbackCase.complaintId}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm font-medium whitespace-normal text-slate-500">
                    {feedbackCase.orderId}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm font-semibold whitespace-normal text-slate-700">
                    {feedbackCase.customer}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm font-medium whitespace-normal text-slate-600">
                    {feedbackCase.vendor}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        typeColorMap[feedbackCase.type]
                      )}
                    >
                      {feedbackCase.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm whitespace-normal text-slate-500">
                    {feedbackCase.category}
                  </TableCell>
                  <TableCell className="max-w-68 px-4 py-4 text-sm whitespace-normal text-slate-500">
                    {feedbackCase.description}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm whitespace-normal text-slate-500">
                    {feedbackCase.date}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        statusColorMap[feedbackCase.status]
                      )}
                    >
                      {feedbackCase.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
