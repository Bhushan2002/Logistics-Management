"use client"

import { UseFormReturn, useForm } from "react-hook-form"
import { FormInput } from "@/components/custom/form-input"
import { Separator } from "@/components/ui/separator"
import { FinanceDetailsTrip, Trip, financeDetailsTripSchema } from "../../../../_data/schema"
import { useEffect, useState } from "react"
import { GSTToggle } from "./gst-toggle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { updateTripDetails } from "@/server/trips"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type CustomerPersonalDetailsFormProps = {
  data: Trip
}


export function TripFinanceDetailsForm(props: CustomerPersonalDetailsFormProps){

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<FinanceDetailsTrip>({
    resolver: zodResolver(financeDetailsTripSchema),
    defaultValues: props.data.financeDetails
  })


  useEffect(() => {
    const units = form.watch("units")
    const rate = form.watch("rate")
    if(units > -1 && rate > -1){
      form.setValue("subTotalAmount", units * rate)
    }
  }, [form, form.watch("units"), form.watch("rate")])

  useEffect(() => {
    const subTotalAmount = form.watch("subTotalAmount")
    const isGST = form.watch("isGST")
    if(subTotalAmount  > -1){
      const gstPercentage = isGST ? form.watch("gstPercentage") ?? 0 : 0
      form.setValue("gstAmount", gstPercentage * subTotalAmount / 100)
    }
  }, [form, form.watch("subTotalAmount"), form.watch("isGST"), form.watch("gstPercentage")])

  useEffect(() => {
    const subTotalAmount = form.watch("subTotalAmount")
    const gstAmount = form.watch("gstAmount")
    if(subTotalAmount > -1 && gstAmount > -1){
      form.setValue("totalAmount", subTotalAmount + gstAmount)
    }
  }, [form, form.watch("subTotalAmount"), form.watch("gstAmount")])

  useEffect(() => {
    const totalAmount = form.watch("totalAmount")
    const advanceAmount = form.watch("advanceAmount")
    const commissionAmount = form.watch("commissionAmount")
    const tsdShortageAmount = form.watch("tsdShortageAmount")
    if(totalAmount > -1 && advanceAmount > -1 && commissionAmount > -1 && tsdShortageAmount > -1){
      form.setValue("dueAmount", totalAmount - advanceAmount - commissionAmount - tsdShortageAmount)
    }
  }, [form, form.watch("totalAmount"), form.watch("advanceAmount"), form.watch("commissionAmount"), form.watch("tsdShortageAmount")])

  async function onSubmit(values: FinanceDetailsTrip){
    const data = {
      financeDetails: values
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
          <h3 className="text-lg font-medium">Finance Details of Trips</h3>
          <p className="text-sm text-muted-foreground">Manage and add finance details of trips.</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <FormInput
            form={form}
            name="units"
            label="Units"
            placeholder="KL/TON"
            type="number"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="rate"
            label="Rate"
            placeholder="Enter the rate per unit"
            type="number"
            className="sm:col-span-5"
          />
          <FormInput
            form={form}
            name="subTotalAmount"
            label="Sub Total"
            placeholder="Enter the sub total amount"
            type="number"
            disabled={true}
            className="sm:col-span-5"
          />
          <GSTToggle
            form={form}
            name="isGST"
            label="GST"
            className="sm:col-span-12"
          />
          <div className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-4">
            {form.watch("isGST") && (
              <FormInput
                form={form}
                name="gstPercentage"
                label="GST Percentage"
                placeholder="Enter the gst percentage"
                type="number"
                className="sm:col-span-5"
              />
            )}
          </div>
          <FormInput
            form={form}
            name="gstAmount"
            label="GST Amount"
            placeholder="Enter the gst amount"
            type="number"
            disabled={true}
            className="sm:col-span-5"
          />
          <FormInput
            form={form}
            name="totalAmount"
            label="Total Amount"
            placeholder="Enter the total amount"
            type="number"
            disabled={true}
            className="sm:col-span-5"
          />
          <FormInput
            form={form}
            name="advanceAmount"
            label="Advance Amount"
            placeholder="Enter the advance amount"
            type="number"
            className="sm:col-span-4"
          />
          <FormInput
            form={form}
            name="commissionAmount"
            label="Comission Amount"
            placeholder="Enter the commission amount"
            type="number"
            className="sm:col-span-4"
          />
          <FormInput
            form={form}
            name="tsdShortageAmount"
            label="TSD/Shortage Amount"
            placeholder="Enter the tds/shortage amount"
            type="number"
            className="sm:col-span-4"
          />
          <FormInput
            form={form}
            name="courier"
            label="Courier"
            placeholder="Enter the courier of the trip"
            className="sm:col-span-5"
          />
          <FormInput
            form={form}
            name="dueAmount"
            label="Due Amount"
            placeholder="Enter the due amount"
            type="number"
            disabled={true}
            className="sm:col-span-5"
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