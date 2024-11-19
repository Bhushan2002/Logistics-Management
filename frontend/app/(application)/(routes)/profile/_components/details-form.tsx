"use client"

import { useSearchParams } from "next/navigation"
import { PersonalDetailsForm } from "./personal-details-form"
import { CompanyDetailsForm } from "./company-details-form"
import { User } from "../_data/schema"

type DetailsFormProps = {
  user: User
}

export function DetailsForm({ user }: DetailsFormProps){
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  return (
    <>
      {tab === "personal" && (
        <PersonalDetailsForm data={user.personalDetails} />
      )}
      {tab === "company" && (
        <CompanyDetailsForm data={user.companyDetails} />
      )}
    </>
  )
}