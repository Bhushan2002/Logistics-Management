"use client"

import { Customer, customerSchema } from "../../_data/schema"
import { CustomerPersonalDetailsForm } from "./customer-personal-details-form"
import { useState } from "react"
import { CustomerCompanyDetailsForm } from "./customer-company-details-form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createCustomer } from "@/server/customer"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


export function DetailsForm(){

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      companyDetails: {
        isGST: false,
      }
    }
  })

  async function onSubmit(values: Customer) {
    setIsLoading(true)
    const response = await createCustomer(values)
    setIsLoading(false)
    if(response?.success){
      router.push("/customers")
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
        <CustomerPersonalDetailsForm form={form} />
        <br />
        <CustomerCompanyDetailsForm form={form} />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>
            Submit
          </span>
        </Button>
      </form>
    </Form>
  )
}