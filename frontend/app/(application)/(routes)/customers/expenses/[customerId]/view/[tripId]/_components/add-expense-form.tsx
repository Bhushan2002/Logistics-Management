"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ExpenseItem, expenseItemSchema } from "../_data/schema"
import { modes } from "../_data/data"
import { usePathname } from "next/navigation"
import { ToastAction } from "@radix-ui/react-toast"
import { addExpense } from "@/server/expenses"

export function AddExpenseForm(){

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ExpenseItem>({
    resolver: zodResolver(expenseItemSchema)
  })
  const pathname = usePathname()
  const tripId = pathname.split("/")[5]
  const { toast } = useToast()

  async function onSubmit(values: ExpenseItem){
    setIsLoading(true)
    const data = {
      items: [values]
    }
    setIsLoading(false)
    const response = await addExpense(tripId, data)
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
            name="amount"
            label="Amount"
            placeholder="Enter amount"
            type="number"
          />
          <FormSelect
            form={form}
            name="mode"
            label="Mode"
            placeholder="Select a mode"
            options={modes}
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