"use client"

import { UseFormReturn } from "react-hook-form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { Separator } from "@/components/ui/separator"
import { Trip } from "../../../_data/schema"
import { statuses } from "../../../_data/data"

type TripPrimaryDetailsFormProps = {
  form: UseFormReturn<Trip>
}


export function TripPrimaryDetailsForm(props: TripPrimaryDetailsFormProps){

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Primary Details of Trips</h3>
        <p className="text-sm text-muted-foreground">Manage and add primary details of trips.</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <FormInput
          form={props.form}
          name="primaryDetails.title"
          label="Trip Title"
          placeholder="Enter the title of trip"
          className="sm:col-span-12"
        />
        <div className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12">
          <FormInput
            form={props.form}
            name="primaryDetails.vehicleNumber"
            label="Vehicle Number"
            placeholder="Enter the vehicle number of trip"
            className="sm:col-span-4"
          />
        </div>
        <div className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12">
          <FormInput
            form={props.form}
            name="primaryDetails.date"
            label="Date"
            placeholder="Enter the date of trip"
            type="date"
            className="sm:col-span-4"
          />
        </div>
        <FormInput
          form={props.form}
          name="primaryDetails.from"
          label="From"
          placeholder="Enter the from location of trip"
          className="sm:col-span-6"
        />
        <FormInput
          form={props.form}
          name="primaryDetails.to"
          label="To"
          placeholder="Enter the to location of trip"
          className="sm:col-span-6"
        />
        <FormSelect
          form={props.form}
          name="primaryDetails.status"
          label="Status"
          placeholder="Select the status of trip"
          options={statuses}
          className="sm:col-span-4"
        />
        <FormInput
          form={props.form}
          name="primaryDetails.lrNumber"
          label="LR Number"
          placeholder="Enter the LR number of trip"
          className="sm:col-span-4"
        />
      </div>
    </div>
  )
}