"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { MoreHorizontal } from "lucide-react"
import { expenseItemSchema } from "../_data/schema"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EditExpenseForm } from "./edit-expense-form"
import { usePathname } from "next/navigation"
import { removeExpense } from "@/server/expenses"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { AlertDialogBox } from "@/components/custom/alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function ExpensesTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()
  const expenseItem = expenseItemSchema.parse(row.original)
  const pathname = usePathname()
  const tripId = pathname.split("/")[5]

  async function onDelete() {
    const body = {
      action: "EXPENSE",
      tripId: tripId as string,
      itemId: expenseItem._id as string,
    }
    const response = await removeExpense(body)
    if(response?.success) {
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
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <AlertDialogBox buttonText="Delete" onClickAction={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Income Form</DialogTitle>
          <DialogDescription>
            Edit the income details in the trip. Once done please click on the submit button.
          </DialogDescription>
        </DialogHeader>
        <EditExpenseForm expenseItem={expenseItem} />
      </DialogContent>
    </Dialog>

  )
}