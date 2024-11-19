import { Customer } from "@/app/(application)/(routes)/customers/_data/schema"
import { Trip } from "../../../../_data/schema"

import { TripReportPrimaryDetails } from "./trip-report-primary-details"
import { Button, buttonVariants } from "@/components/ui/button"
import { TripReportFinanceDetails } from "./trip-report-finance-details"
import { TripReportIncomeDetails } from "./trip-report-income-details"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TripReportExpenseDetails } from "./trip-report-expense-details"

type TripReportProps = {
  trip: Trip,
  customer: Customer,
}

export function TripReport(props: TripReportProps) {


  return (
    <div className="space-y-12">
      <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
        <div className="flex sm:items-baseline sm:space-x-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Trip #{props.trip._id?.slice(18, 23)}</h1>
          <Link href={`/customers/trips/${props.customer._id}/view/${props.trip._id}?tab=primary`} className={cn(buttonVariants({ variant: "link" }), "hidden sm:block px-0")}>
            Edit
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
        <p className="text-sm text-gray-600">
          Trip date{' '}
          <time dateTime="2021-03-22" className="font-medium text-gray-900">
            {props.trip.primaryDetails.date}
          </time>
        </p>
        <Button variant="link" className="sm:hidden px-0">
          Print Report
          <span aria-hidden="true"> &rarr;</span>
        </Button>
      </div>
      <TripReportPrimaryDetails trip={props.trip} customer={props.customer} />
      <TripReportFinanceDetails trip={props.trip} customer={props.customer} />
      <TripReportIncomeDetails trip={props.trip} customer={props.customer} />
      <TripReportExpenseDetails trip={props.trip} customer={props.customer} />
    </div>
  )
}