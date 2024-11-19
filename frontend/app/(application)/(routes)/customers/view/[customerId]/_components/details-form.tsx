"use client"

import { useSearchParams } from "next/navigation"
import { Customer } from "../../../_data/schema"
import { CustomerPersonalDetailsForm } from "./customer-personal-details-form"
import { CustomerCompanyDetailsForm } from "./customer-company-details-form"

type DetailsFormProps = {
  customer: Customer
}

export function DetailsForm({ customer }: DetailsFormProps){
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  return (
    <div className="space-y-6">
      {tab === "personal" && (
        <CustomerPersonalDetailsForm data={customer} />
      )}
      {tab === "company" && (
        <CustomerCompanyDetailsForm data={customer} />
      )}
    </div>
  )
}