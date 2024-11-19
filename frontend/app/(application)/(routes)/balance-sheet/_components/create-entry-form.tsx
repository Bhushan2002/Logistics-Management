"use client"

import { useForm } from "react-hook-form"
import { BalanceSheetEntry, balanceSheetEntrySchema } from "../_data/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { accountNames, statuses } from "../_data/data"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { createBalanceSheet } from "@/server/balance-sheet"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function CreateEntryForm(){

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<BalanceSheetEntry>({
    resolver: zodResolver(balanceSheetEntrySchema)
  })

  const { toast } = useToast()

  async function onSubmit(values: BalanceSheetEntry){
    const body = {
      items: [values]
    }
    setIsLoading(true)
    const response = await createBalanceSheet(body)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            form={form}
            name="title"
            label="Title"
            placeholder="Enter title"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="accountName"
            label="Account Name"
            placeholder="Enter account name"
          />
          <FormInput
            form={form}
            name="amount"
            label="Amount"
            placeholder="Enter amount"
            type="number"
          />
          <FormSelect
            form={form}
            name="status"
            label="Status"
            placeholder="Select status"
            options={statuses}
          />
          <FormInput
            form={form}
            name="date"
            label="Date"
            placeholder="Select date"
            type="date"
          />
        </div>
        <Button type="submit" className="w-full">
          {isLoading && (<Loader2 className="h-4 w-4 mr-2 animate-spin" />)}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  )
}