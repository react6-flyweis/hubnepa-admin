import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PendingApprovalsSection() {
  return (
    <Card className="border-0 bg-linear-to-br from-amber-400 via-orange-500 to-orange-600 text-white ring-0">
      <CardHeader className="space-y-3">
        <CardTitle className="font-display text-2xl font-semibold tracking-tight text-white">
          Pending Approvals
        </CardTitle>
        <CardDescription className="max-w-xs text-sm leading-5 text-orange-50/95">
          You have 12 new vendor requests and 5 restaurant applications waiting.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          size="lg"
          className="w-full bg-white font-semibold text-orange-600 shadow-sm hover:bg-orange-50"
        >
          Review Applications
        </Button>
      </CardContent>
    </Card>
  )
}
