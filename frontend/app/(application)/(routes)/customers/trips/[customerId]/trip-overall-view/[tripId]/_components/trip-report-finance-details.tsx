import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trip } from "../../../../_data/schema"
import { Customer } from "@/app/(application)/(routes)/customers/_data/schema"
import { formatNumberToIndianReadble, uppercaseFirstCharacter } from "@/utils/utils"
import { Badge } from "@/components/ui/badge"
import { AtSign, PhoneCall } from "lucide-react"
import { statuses } from "../../../../_data/data"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

type TripReportFinanceDetailsProps = {
  trip: Trip,
  customer: Customer,
}

export function TripReportFinanceDetails(props: TripReportFinanceDetailsProps) {
  console.log(props.trip.financeDetails)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          Finance Details
          {props.trip.financeDetails.isGST && <Badge variant="secondary" className="ml-2">GST</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="divide-y text-sm lg:mt-0">
          <div className="flex items-center justify-between pb-4">
            <dt className="text-muted-forground">Number of units</dt>
            <dd className="font-medium">{props.trip.financeDetails.units}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">Rate per unit</dt>
            <dd className="font-medium">Rs {formatNumberToIndianReadble(props.trip.financeDetails.rate)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">Subtotal</dt>
            <dd className="font-medium">Rs {formatNumberToIndianReadble(props.trip.financeDetails.subTotalAmount)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">GST amount</dt>
            <dd className="font-medium">Rs {formatNumberToIndianReadble(props.trip.financeDetails.gstAmount)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">Total</dt>
            <dd className="font-medium text-emerald-600">Rs {formatNumberToIndianReadble(props.trip.financeDetails.totalAmount)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">Advance</dt>
            <dd className="font-medium">Rs {formatNumberToIndianReadble(props.trip.financeDetails.advanceAmount)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">Commission</dt>
            <dd className="font-medium">Rs {formatNumberToIndianReadble(props.trip.financeDetails.commissionAmount)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">TSD / Shortage</dt>
            <dd className="font-medium">Rs {formatNumberToIndianReadble(props.trip.financeDetails.tsdShortageAmount)}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-muted-forground">Due amount</dt>
            <dd className="font-medium text-red-600">Rs {formatNumberToIndianReadble(props.trip.financeDetails.dueAmount)}</dd>
          </div>
          <div className="flex items-center justify-between pt-4">
            <dt className="text-muted-forground">Courier</dt>
            <dd className="font-medium">{props.trip.financeDetails.courier}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}