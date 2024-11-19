import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trip } from "../../../../_data/schema"
import { Customer } from "@/app/(application)/(routes)/customers/_data/schema"
import { formatNumberToIndianReadble } from "@/utils/utils"
import { TrendingDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TripReportExpenseDetailsProps = {
  trip: Trip,
  customer: Customer,
}

export function TripReportExpenseDetails(props: TripReportExpenseDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          Expense Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
              <TrendingDown className="h-5 w-5" color="#65B741" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs {formatNumberToIndianReadble(props.trip.expenseDetails?.totalAmount ?? 0)}</div>
              <p className="text-xs text-muted-foreground">
                Total expense amount from trip
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Sr.No.</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.trip.expenseDetails?.items.map((income, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell >{income.title}</TableCell>
                  <TableCell >Rs {formatNumberToIndianReadble(income.amount)}</TableCell>
                  <TableCell >{income.mode}</TableCell>
                  <TableCell className="text-right">{income.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}