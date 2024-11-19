"use client"

import { useForm } from "react-hook-form"
import { customerPersonalDetailsSchema, CustomerPersonalDetails, Customer } from "../../../_data/schema"
import { salutations, types } from "../../../_data/data"
import { FormInput } from "@/components/custom/form-input"
import { FormRadioGroup } from "@/components/custom/form-radio-group"
import { FormSelect } from "@/components/custom/form-select"
import { Separator } from "@/components/ui/separator"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { updateCustomerDetails } from "@/server/customer"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type CustomerPersonalDetailsFormProps = {
  data: Customer,
}


export function CustomerPersonalDetailsForm(props: CustomerPersonalDetailsFormProps){

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<CustomerPersonalDetails>({
    resolver: zodResolver(customerPersonalDetailsSchema),
    defaultValues: props.data.personalDetails,
  })
  const { toast } = useToast()

  async function onSubmit(values: CustomerPersonalDetails){
    const data = {
      personalDetails: {
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
        <h3 className="text-lg font-medium">Personal Details of Customers</h3>
        <p className="text-sm text-muted-foreground">Manage and add personal details of customers.</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <FormRadioGroup
              form={form}
              name="type"
              label="Type"
              description="Select the type of customer"
              options={types}
              className="sm:col-span-12"
            />
            <FormSelect
              form={form}
              name="salutation"
              label="Salutation"
              options={salutations}
              placeholder="Select the salutation of customer"
              className="sm:col-span-2"
            />
            <FormInput
              form={form}
              name="firstName"
              label="First Name"
              placeholder="Enter the first name of customer"
              className="sm:col-span-5"
            />
            <FormInput
              form={form}
              name="lastName"
              label="Last Name"
              placeholder="Enter the last name of customer"
              className="sm:col-span-5"
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