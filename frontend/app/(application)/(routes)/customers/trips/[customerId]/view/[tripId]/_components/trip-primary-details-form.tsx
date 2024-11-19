"use client"

import { UseFormReturn, useForm } from "react-hook-form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { Separator } from "@/components/ui/separator"
import { PrimaryDetailsTrip, Trip, primaryDetailsTripSchema } from "../../../../_data/schema"
import { statuses } from "../../../../_data/data"
import { Form } from "@/components/ui/form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { updateTripDetails } from "@/server/trips"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type CustomerPersonalDetailsFormProps = {
  data: Trip
}


export function TripPrimaryDetailsForm(props: CustomerPersonalDetailsFormProps){

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<PrimaryDetailsTrip>({
    resolver: zodResolver(primaryDetailsTripSchema),
    defaultValues: props.data.primaryDetails
  })

  async function onSubmit(values: PrimaryDetailsTrip){
    const data = {
      primaryDetails: values
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
          <h3 className="text-lg font-medium">Primary Details of Trips</h3>
          <p className="text-sm text-muted-foreground">Manage and add primary details of trips.</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <FormInput
            form={form}
            name="title"
            label="Trip Title"
            placeholder="Enter the title of trip"
            className="sm:col-span-12"
          />
          <div className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12">
            <FormInput
              form={form}
              name="vehicleNumber"
              label="Vehicle Number"
              placeholder="Enter the vehicle number of trip"
              className="sm:col-span-4"
            />
          </div>
          <div className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12">
            <FormInput
              form={form}
              name="date"
              label="Date"
              placeholder="Enter the date of trip"
              type="date"
              className="sm:col-span-4"
            />
          </div>
          <FormInput
            form={form}
            name="from"
            label="From"
            placeholder="Enter the from location of trip"
            className="sm:col-span-6"
          />
          <FormInput
            form={form}
            name="to"
            label="To"
            placeholder="Enter the to location of trip"
            className="sm:col-span-6"
          />
          <FormSelect
            form={form}
            name="status"
            label="Status"
            placeholder="Select the status of trip"
            options={statuses}
            className="sm:col-span-4"
          />
          <FormInput
            form={form}
            name="lrNumber"
            label="LR Number"
            placeholder="Enter the LR number of trip"
            className="sm:col-span-4"
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