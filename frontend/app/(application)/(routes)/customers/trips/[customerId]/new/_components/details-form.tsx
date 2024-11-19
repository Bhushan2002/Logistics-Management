"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Trip, tripSchema } from "../../../_data/schema"
import { TripPrimaryDetailsForm } from "./trip-primary-details-form"
import { TripFinanceDetailsForm } from "./trip-finance-details-form"
import { TripDriverDetailsForm } from "./trip-driver-details-form"
import { usePathname, useRouter } from "next/navigation"
import { createTrip } from "@/server/trips"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


export function DetailsForm(){

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const customerId = pathname.split("/")[3]

  const form = useForm<Trip>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      financeDetails: {
        units: 0,
        rate: 0,
        subTotalAmount: 0,
        isGST: false,
        gstAmount: 0,
        gstPercentage: 0,
        totalAmount: 0,
        advanceAmount: 0,
        commissionAmount: 0,
        tsdShortageAmount: 0,
        dueAmount: 0,
      }
    }
  })

  async function onSubmit(values: Trip) {
    const body = {
      customerId,
      ...values
    }
    setIsLoading(true)
    const response = await createTrip(body)
    setIsLoading(false)
    if(response?.success){
      router.push("/customers/trips/" + customerId)
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
        <TripPrimaryDetailsForm form={form} />
        <br />
        <TripFinanceDetailsForm form={form} />
        <br />
        <TripDriverDetailsForm form={form} />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>
            Save
          </span>
        </Button>
      </form>
    </Form>
  )
}