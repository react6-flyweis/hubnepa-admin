import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ExpenseItem {
  id: string
  date: string
  category: string
  description: string
  amount: string
  status: "paid" | "pending" | "overdue"
}

const expenseCards = [
  {
    title: "Payroll",
    description: "Manage staff salaries",
  },
  {
    title: "Maintenance Logs",
    description: "Equipment & repairs",
  },
  {
    title: "Other Expenses",
    description: "Utilities, rent, etc.",
  },
]

const recentExpenses: ExpenseItem[] = [
  {
    id: "E-001",
    date: "Feb 18, 2026",
    category: "Ingredients",
    description: "Fresh produce delivery",
    amount: "$450",
    status: "paid",
  },
  {
    id: "E-002",
    date: "Feb 15, 2026",
    category: "Payroll",
    description: "Staff salaries",
    amount: "$3,200",
    status: "paid",
  },
  {
    id: "E-003",
    date: "Feb 12, 2026",
    category: "Maintenance",
    description: "Equipment repair",
    amount: "$180",
    status: "pending",
  },
]

const statusColorMap: Record<ExpenseItem["status"], string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
}

const statusLabelMap: Record<ExpenseItem["status"], string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
}

export function RestaurantPanelExpensesTab() {
  return (
    <TabsContent value="expenses" className="mt-0">
      <Card className="rounded-2xl border-slate-200 bg-white ring-0">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Expense Management
            </CardTitle>
            <p className="text-sm text-slate-500">
              Track expenses and stay on top of your restaurant's costs.
            </p>
          </div>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {expenseCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">
                  {card.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold text-slate-900">
              Recent Expenses
            </p>
            <Table>
              <TableHeader className="">
                <TableRow>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Category
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Description
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium text-slate-900">
                      {expense.date}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {expense.category}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {expense.description}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900">
                      {expense.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "h-7 rounded-full px-3 text-xs font-semibold",
                          statusColorMap[expense.status]
                        )}
                      >
                        {statusLabelMap[expense.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
