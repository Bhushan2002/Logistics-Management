import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { AddExpenseForm } from "./add-expense-form"

export function AddExpense() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Expense Form</DialogTitle>
          <DialogDescription>
            Add new expense in the trip. Once done please click on the submit button.
          </DialogDescription>
        </DialogHeader>
        <AddExpenseForm />
      </DialogContent>
    </Dialog>
  )
}