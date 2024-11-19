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
import { CreateEntryForm } from "./create-entry-form"

export function CreateEntry() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Enrty Form</DialogTitle>
          <DialogDescription>
            Create new entry in the balance sheet. Once done please click on the submit button.
          </DialogDescription>
        </DialogHeader>
        <CreateEntryForm />
      </DialogContent>
    </Dialog>
  )
}