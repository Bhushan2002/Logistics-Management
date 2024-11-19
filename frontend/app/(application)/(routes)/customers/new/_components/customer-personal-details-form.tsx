"use client"

import { UseFormReturn } from "react-hook-form"
import { salutations, types } from "../../_data/data"
import { FormInput } from "@/components/custom/form-input"
import { FormRadioGroup } from "@/components/custom/form-radio-group"
import { FormSelect } from "@/components/custom/form-select"
import { Separator } from "@/components/ui/separator"
import { Customer } from "../../_data/schema"

type CustomerPersonalDetailsFormProps = {
  form: UseFormReturn<Customer>
}


export function CustomerPersonalDetailsForm(props: CustomerPersonalDetailsFormProps){


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Personal Details of Customers</h3>
        <p className="text-sm text-muted-foreground">Manage and add personal details of customers.</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <FormRadioGroup
          form={props.form}
          name="personalDetails.type"
          label="Type"
          description="Select the type of customer"
          options={types}
          className="sm:col-span-12"
        />
        <FormSelect
          form={props.form}
          name="personalDetails.salutation"
          label="Salutation"
          options={salutations}
          placeholder="Select the salutation of customer"
          className="sm:col-span-2"
        />
        <FormInput
          form={props.form}
          name="personalDetails.firstName"
          label="First Name"
          placeholder="Enter the first name of customer"
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="personalDetails.lastName"
          label="Last Name"
          placeholder="Enter the last name of customer"
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="personalDetails.email"
          label="Email"
          placeholder="Enter the email address of customer"
          className="sm:col-span-6"
        />
        <FormInput
          form={props.form}
          name="personalDetails.phone"
          label="Phone"
          placeholder="Enter the phone number of customer"
          className="sm:col-span-6"
        />
      </div>
    </div>
  )
}