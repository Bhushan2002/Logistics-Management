"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CompanyDetails, companyDetailsSchema } from "../_data/schema"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/custom/form-input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { FormTextarea } from "@/components/custom/form-textarea"
import { updateUser } from "@/server/user"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"
import { FormFile } from "@/components/custom/form-file"

type CompanyDetailsFormProps = {
  data: CompanyDetails
}


export function CompanyDetailsForm({ data }: CompanyDetailsFormProps){

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<CompanyDetails>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: data,
  })

  const { toast } = useToast()


  async function onSubmit(values: CompanyDetails) {
    setIsLoading(true)
    const body = {
      companyDetails: values
    }
    const response = await updateUser(body)
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
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Company Details</h3>
        <p className="text-sm text-muted-foreground">Update your company details.</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <FormFile
              form={form}
              name="companyLogo"
              label="Company Logo"
              placeholder="Upload your company logo"
              className="sm:col-span-12"
            />
            <FormInput
              form={form}
              name="name"
              label="Company Name"
              placeholder="Enter your company name"
              className="sm:col-span-12"
            />
            <FormTextarea
              form={form}
              name="address"
              label="Company Address"
              placeholder="Enter your company address"
              className="sm:col-span-12"
            />
            <FormInput
              form={form}
              name="email"
              label="Company Email"
              placeholder="Enter your company email address"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="phone"
              label="Company Phone"
              placeholder="Enter your company phone number"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="panNumber"
              label="Company PAN Number"
              placeholder="Enter your company pan number"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="gstNumber"
              label="Company GST Number"
              placeholder="Enter your company gst number"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="gstPercentage"
              label="GST Percentage"
              type="number"
              placeholder="Enter your percentage of gst"
              className="sm:col-span-6"
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>
              Update
            </span>
          </Button>
        </form>
      </Form>
    </div>
  )
}