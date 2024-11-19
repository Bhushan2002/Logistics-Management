import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatNumberToIndianReadble } from "@/utils/utils"
import { Customer } from "../../customers/_data/schema"

type RecentTripProps = {
  thisMonthTrips: Customer
}

export function RecentTrip(props: RecentTripProps){

  const totalIncome = props.thisMonthTrips?.trips?.reduce((accumulator, trip) => accumulator + trip.financeDetails.totalAmount, 0) ?? 0
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="/logo.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="font-semibold">{props.thisMonthTrips.personalDetails.firstName} {props.thisMonthTrips.personalDetails.lastName}</p>
          <p className="text-sm text-muted-foreground">{props.thisMonthTrips.companyDetails.name}</p>
        </div>
      </div>
      <p className="text-lg font-semibold">₹ {formatNumberToIndianReadble(totalIncome)}</p>
    </div>
  )
}