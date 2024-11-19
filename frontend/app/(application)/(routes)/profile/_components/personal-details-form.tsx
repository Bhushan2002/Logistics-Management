"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PersonalDetails, personalDetailsSchema } from "../_data/schema"
import { Form } from "@/components/ui/form"
import { FormSelect } from "@/components/custom/form-select"
import { salutations } from "../_data/data"
import { FormInput } from "@/components/custom/form-input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { updateUser } from "@/server/user"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"
import { FormFile } from "@/components/custom/form-file"

type PersonalDetailsFormProps = {
  data: PersonalDetails
}


export function PersonalDetailsForm({ data }: PersonalDetailsFormProps){

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<PersonalDetails>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: data,
  })

  const { toast } =  useToast()

  async function onSubmit(values: PersonalDetails) {
    setIsLoading(true)
    const body = {
      personalDetails: values
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
        <h3 className="text-lg font-medium">Personal Details</h3>
        <p className="text-sm text-muted-foreground">Update your personal details.</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <FormSelect
              form={form}
              name="salutation"
              label="Salutation"
              placeholder="Select your salutation"
              options={salutations}
              className="sm:col-span-2"
            />
            <FormInput
              form={form}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              className="sm:col-span-5"
            />
            <FormInput
              form={form}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              className="sm:col-span-5"
            />
            <FormFile
              form={form}
              name="sign"
              label="Signature"
              placeholder="Upload your signature for all reports and invoices generation"
              className="sm:col-span-12"
            />
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Enter your email address"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
              className="sm:col-span-6"
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="Enter your password"
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