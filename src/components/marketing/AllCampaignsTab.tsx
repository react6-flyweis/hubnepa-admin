import { useMemo, useState } from "react"
import {
  Bell,
  Image,
  Mail,
  MoreVertical,
  Search,
  SlidersHorizontal,
  Tag,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "../ui/card"

type CampaignType = "Banner" | "Coupon" | "Email" | "Notification"

type CampaignStatus = "Active" | "Draft" | "Scheduled" | "Ended"

interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  startDate: string
  endDate: string
  reach?: string
  clicks?: string
}

const campaignTypeIconMap: Record<
  CampaignType,
  { icon: LucideIcon; label: string }
> = {
  Banner: { icon: Image, label: "Banner" },
  Coupon: { icon: Tag, label: "Coupon" },
  Email: { icon: Mail, label: "Email" },
  Notification: { icon: Bell, label: "Notification" },
}

const campaignTypeStyleMap: Record<CampaignType, string> = {
  Banner: "border-indigo-100 bg-indigo-50 text-indigo-700",
  Coupon: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Email: "border-amber-100 bg-amber-50 text-amber-700",
  Notification: "border-sky-100 bg-sky-50 text-sky-700",
}

const campaignStatusStyleMap: Record<CampaignStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Draft: "border-slate-200 bg-slate-100 text-slate-600",
  Scheduled: "border-blue-200 bg-blue-50 text-blue-700",
  Ended: "border-rose-200 bg-rose-50 text-rose-700",
}

const campaigns: Campaign[] = [
  {
    id: "camp_001",
    name: "Summer Sale 2024",
    type: "Banner",
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    reach: "12.5k",
    clicks: "450",
  },
  {
    id: "camp_002",
    name: "New User Welcome",
    type: "Coupon",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    reach: "5.2k",
    clicks: "1.2k",
  },
  {
    id: "camp_003",
    name: "Black Friday Prep",
    type: "Email",
    status: "Draft",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
  },
  {
    id: "camp_004",
    name: "Flash Deal Tuesday",
    type: "Notification",
    status: "Scheduled",
    startDate: "2024-07-02",
    endDate: "2024-07-02",
    reach: "15k",
  },
  {
    id: "camp_005",
    name: "Free Delivery Weekend",
    type: "Coupon",
    status: "Ended",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    reach: "8.9k",
    clicks: "2.1k",
  },
]

export function AllCampaignsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStatuses, setActiveStatuses] = useState<CampaignStatus[]>([])

  const filteredCampaigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return campaigns.filter((campaign) => {
      const matchesSearch =
        !query ||
        campaign.name.toLowerCase().includes(query) ||
        campaign.type.toLowerCase().includes(query)

      const matchesStatus =
        activeStatuses.length === 0 || activeStatuses.includes(campaign.status)

      return matchesSearch && matchesStatus
    })
  }, [searchQuery, activeStatuses])

  const toggleStatusFilter = (status: CampaignStatus) => {
    setActiveStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    )
  }

  return (
    <Card className="">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            All Campaigns
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage all your marketing initiatives
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <InputGroup className="w-full max-w-sm rounded-lg border-slate-200 bg-white">
            <InputGroupAddon align="inline-start" className="pr-2">
              <Search className="h-4 w-4 text-slate-400" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search campaigns..."
              className="text-sm"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 gap-2 px-3 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52" sideOffset={6}>
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(
                ["Active", "Draft", "Scheduled", "Ended"] as CampaignStatus[]
              ).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={activeStatuses.includes(status)}
                  onCheckedChange={() => toggleStatusFilter(status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50 [&_tr]:border-slate-200">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Campaign name
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Type
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Duration
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Reach
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Clicks
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCampaigns.map((campaign) => {
              const typeConfig = campaignTypeIconMap[campaign.type]
              const TypeIcon = typeConfig.icon

              return (
                <TableRow key={campaign.id} className="">
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-slate-900">
                        {campaign.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {campaign.id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-medium",
                        campaignTypeStyleMap[campaign.type]
                      )}
                    >
                      <TypeIcon className="h-3.5 w-3.5" />
                      {typeConfig.label}
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <Badge
                      className={cn(
                        "h-6 rounded-full px-2 text-xs font-semibold",
                        campaignStatusStyleMap[campaign.status]
                      )}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <div className="text-sm text-slate-600">
                      {campaign.startDate}
                      <br />
                      {campaign.endDate}
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {campaign.reach ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-sm text-slate-700">
                    {campaign.clicks ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-slate-500"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
