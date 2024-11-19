"use client"

import { UseFormReturn } from "react-hook-form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { Separator } from "@/components/ui/separator"
import { Trip } from "../../../_data/schema"
import { salutations } from "../../../_data/data"

type TripDriverDetailsFormProps = {
  form: UseFormReturn<Trip>
}


export function TripDriverDetailsForm(props: TripDriverDetailsFormProps){


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Driver Details of Trips</h3>
        <p className="text-sm text-muted-foreground">Manage and add driver&apos;s details of trips.</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <FormSelect
          form={props.form}
          name="driverDetails.salutation"
          label="Salutation"
          placeholder="Enter the salutation of driverDetails"
          options={salutations}
          className="sm:col-span-2"
        />
        <FormInput
          form={props.form}
          name="driverDetails.firstName"
          label="First Name"
          placeholder="Enter the first name of driverDetails"
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="driverDetails.lastName"
          label="Last Name"
          placeholder="Enter the last name of driverDetails"
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="driverDetails.phone"
          label="Phone"
          placeholder="Enter the phone number of driverDetails"
          className="sm:col-span-6"
        />
      </div>
    </div>
  )
}