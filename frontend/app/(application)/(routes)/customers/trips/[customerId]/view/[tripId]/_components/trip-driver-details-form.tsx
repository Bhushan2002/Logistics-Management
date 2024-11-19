"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { Separator } from "@/components/ui/separator"
import { DriverDetailsTrip, Trip, driverDetailsTripSchema } from "../../../../_data/schema"
import { salutations } from "../../../../_data/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { updateTripDetails } from "@/server/trips"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type TripDriverDetailsFormProps = {
  data: Trip
}


export function TripDriverDetailsForm(props: TripDriverDetailsFormProps){

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<DriverDetailsTrip>({
    resolver: zodResolver(driverDetailsTripSchema),
    defaultValues: props.data.driverDetails
  })

  async function onSubmit(values: DriverDetailsTrip){
    const data = {
      driverDetails: values
    }
    setIsLoading(true)    
    const response = await updateTripDetails(props.data._id as string, data)
    setIsLoading(false)
    if (response?.success) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Driver Details of Trips</h3>
          <p className="text-sm text-muted-foreground">Manage and add driver&apos;s details of trips.</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <FormSelect
            form={form}
            name="salutation"
            label="Salutation"
            placeholder="Enter the salutation of driver"
            options={salutations}
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="firstName"
            label="First Name"
            placeholder="Enter the first name of driver"
            className="sm:col-span-5"
          />
          <FormInput
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Enter the last name of driver"
            className="sm:col-span-5"
          />
          <FormInput
            form={form}
            name="phone"
            label="Phone"
            placeholder="Enter the phone number of driver"
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
  )
}