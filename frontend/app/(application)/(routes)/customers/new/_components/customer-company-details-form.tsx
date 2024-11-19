"use client"

import { UseFormReturn } from "react-hook-form"
import { Customer } from "../../_data/schema"
import { FormInput } from "@/components/custom/form-input"
import { Separator } from "@/components/ui/separator"
import { FormTextarea } from "@/components/custom/form-textarea"
import { GSTToggle } from "./gst-toggle"

type CustomerCompanyDetailsFormProps = {
  form: UseFormReturn<Customer>
}

export function CustomerCompanyDetailsForm(props: CustomerCompanyDetailsFormProps){
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Company Details of Customers</h3>
        <p className="text-sm text-muted-foreground">Manage and add company details of customers.</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <FormInput
          form={props.form}
          name="companyDetails.name"
          label="Company Name"
          placeholder="Enter the name of company"
          className="sm:col-span-12"
        />
        <FormInput
          form={props.form}
          name="companyDetails.email"
          label="Email"
          placeholder="Enter the email address of customer"
          className="sm:col-span-6"
        />
        <FormInput
          form={props.form}
          name="companyDetails.phone"
          label="Phone"
          placeholder="Enter the phone number of customer"
          className="sm:col-span-6"
        />
        <FormTextarea
          form={props.form}
          name="companyDetails.address"
          label="Address"
          placeholder="Enter the address of company"
          className="sm:col-span-12"
        />
        <GSTToggle
          form={props.form}
          name="companyDetails.isGST"
          label="GST"
          className="sm:col-span-12"
        />
        <FormInput
          form={props.form}
          name="companyDetails.gstNumber"
          label="GST Number"
          placeholder="Enter the gst number of customer"
          className="sm:col-span-6"
        />
        <FormInput
          form={props.form}
          name="companyDetails.panNumber"
          label="PAN Number"
          placeholder="Enter the pan number of customer"
          className="sm:col-span-6"
        />
      </div>
    </div>
  )
}