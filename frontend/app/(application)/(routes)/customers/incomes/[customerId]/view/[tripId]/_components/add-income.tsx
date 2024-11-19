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
import { AddIncomeForm } from "./add-income-form"

export function AddIncome() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Income
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Income Form</DialogTitle>
          <DialogDescription>
            Add new income in the trip. Once done please click on the submit button.
          </DialogDescription>
        </DialogHeader>
        <AddIncomeForm />
      </DialogContent>
    </Dialog>
  )
}