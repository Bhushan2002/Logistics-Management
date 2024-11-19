"use client"

import { Trip } from "../../../../_data/schema"
import { TripPrimaryDetailsForm } from "./trip-primary-details-form"
import { TripFinanceDetailsForm } from "./trip-finance-details-form"
import { TripDriverDetailsForm } from "./trip-driver-details-form"
import { useSearchParams } from "next/navigation"

type DetailsFormProps = {
  data: Trip
}


export function DetailsForm(props: DetailsFormProps){

  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  return (
    <>
      {tab === "primary" && <TripPrimaryDetailsForm data={props.data} />}
      {tab === "finance" && <TripFinanceDetailsForm data={props.data} />}
      {tab === "driver" && <TripDriverDetailsForm data={props.data} />}
    </>
  )
}