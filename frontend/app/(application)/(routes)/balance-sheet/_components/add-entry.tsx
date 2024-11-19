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
import { AddEntryForm } from "./add-entry-form"

export function AddEntry() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Enrty Form</DialogTitle>
          <DialogDescription>
            Add new entry in the balance sheet. Once done please click on the submit button.
          </DialogDescription>
        </DialogHeader>
        <AddEntryForm />
      </DialogContent>
    </Dialog>
  )
}