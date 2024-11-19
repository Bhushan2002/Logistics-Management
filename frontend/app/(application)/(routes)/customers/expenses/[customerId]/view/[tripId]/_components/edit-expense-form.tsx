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
import { ToastAction } from "@/components/ui/toast"
import { ExpenseItem, expenseItemSchema } from "../_data/schema"
import { updateIncome } from "@/server/incomes"
import { usePathname } from "next/navigation"
import { modes } from "../_data/data"
import { updateExpense } from "@/server/expenses"

type EditExpenseFormProps = {
  expenseItem: ExpenseItem
}

export function EditExpenseForm(props: EditExpenseFormProps){

  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const form = useForm<ExpenseItem>({
    resolver: zodResolver(expenseItemSchema),
    defaultValues: props.expenseItem
  })

  const { toast } = useToast()

  const tripId = pathname.split("/")[5]

  async function onSubmit(values: ExpenseItem){
    setIsLoading(true)
    const data = {
      items: [values]
    }
    const response = await updateExpense(tripId, data)
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
            placeholder="Enter date"
            type="date"
          />
        </div>
        <Button type="submit" className="w-full">
          {isLoading && (<Loader2 className="h-4 w-4 mr-2 animate-spin" />)}
          <span>Save</span>
        </Button>
      </form>
    </Form>
  )
}