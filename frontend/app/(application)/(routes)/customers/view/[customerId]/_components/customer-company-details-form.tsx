"use client"

import { useForm } from "react-hook-form"
import { Customer, CustomerCompanyDetails, customerCompanyDetailsSchema } from "../../../_data/schema"
import { FormInput } from "@/components/custom/form-input"
import { Separator } from "@/components/ui/separator"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { Loader2 } from "lucide-react"
import { FormTextarea } from "@/components/custom/form-textarea"
import { GSTToggle } from "./gst-toggle"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { updateCustomerDetails } from "@/server/customer"
import { ToastAction } from "@/components/ui/toast"

type CustomerCompanyDetailsFormProps = {
  data: Customer,
}


export function CustomerCompanyDetailsForm(props: CustomerCompanyDetailsFormProps){

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<CustomerCompanyDetails>({
    resolver: zodResolver(customerCompanyDetailsSchema),
    defaultValues: {
      ...props.data.companyDetails,
      isGST: props.data.companyDetails?.isGST ?? false
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: CustomerCompanyDetails){
    const data = {
      companyDetails: {
        ...values
      }
    }
    setIsLoading(true)
    const response = await updateCustomerDetails(props.data._id as string, data)
    setIsLoading(false)
    if(response?.success){
      location.reload()
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Company Details of Customers</h3>
        <p className="text-sm text-muted-foreground">Manage and add company details of customers.</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <FormInput
              form={form}
              name="name"
              label="Company Name"
              placeholder="Enter the name of company"
              className="sm:col-span-12"
            />
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Enter the email address of customer"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="phone"
              label="Phone"
              placeholder="Enter the phone number of customer"
              className="sm:col-span-6"
            />
            <FormTextarea
              form={form}
              name="address"
              label="Address"
              placeholder="Enter the address of company"
              className="sm:col-span-12"
            />
            <GSTToggle
              form={form}
              name="isGST"
              label="GST"
              className="sm:col-span-12"
            />
            <FormInput
              form={form}
              name="gstNumber"
              label="GST Number"
              placeholder="Enter the gst number of customer"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="panNumber"
              label="PAN Number"
              placeholder="Enter the pan number of customer"
              className="sm:col-span-6"
            />
          </div>
          <div className="space-x-4">
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>
                Update
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}