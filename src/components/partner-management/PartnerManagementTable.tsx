import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  FileText,
  MoreHorizontal,
  XCircle,
} from "lucide-react"
import { Link } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import type {
  Partner,
  PartnerStatus,
  PartnerVerification,
} from "@/types/partner"

const statusColorMap: Record<PartnerStatus, string> = {
  Active: "border-emerald-500 bg-emerald-50 text-emerald-600",
  Pending: "border-amber-400 bg-amber-50 text-amber-600",
  Suspended: "border-red-400 bg-red-50 text-red-500",
  Inactive: "border-gray-400 bg-gray-50 text-gray-500",
}

const verificationConfig: Record<
  PartnerVerification,
  { icon: React.ReactNode; className: string }
> = {
  Verified: {
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    className: "text-emerald-600",
  },
  "Pending Review": {
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    className: "text-amber-600",
  },
  Rejected: {
    icon: <XCircle className="h-4 w-4 text-red-500" />,
    className: "text-red-500",
  },
}

interface PartnerManagementTableProps {
  partners: Partner[]
}

export function PartnerManagementTable({
  partners,
}: PartnerManagementTableProps) {
  return (
    <Table>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Business Name
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Owner
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Category
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Status
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Verification
          </TableHead>
          <TableHead className="text-right text-xs font-semibold tracking-wide uppercase">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="py-10 text-center text-muted-foreground"
            >
              No partners found.
            </TableCell>
          </TableRow>
        )}
        {partners.map((partner) => {
          const verification = verificationConfig[partner.verification]
          return (
            <TableRow key={partner.id}>
              <TableCell>
                <div className="font-semibold">{partner.businessName}</div>
                <div className="text-xs text-muted-foreground">
                  {partner.id}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {partner.owner}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {partner.category}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn("font-medium", statusColorMap[partner.status])}
                >
                  {partner.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "flex items-center gap-1.5 font-medium",
                    verification.className
                  )}
                >
                  {verification.icon}
                  {partner.verification}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-3xs">
                    <DropdownMenuLabel>Manage</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`/partners/${partner.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to={`/partners/${partner.id}/verification-documents`}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Verify Documents
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-emerald-600">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Block Access
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
