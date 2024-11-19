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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { balanceSheetEntrySchema } from "../_data/schema"

import { MoreHorizontal } from "lucide-react"
import { removeEntry } from "@/server/balance-sheet"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { EditEntryForm } from "./edit-entry-form"
import { AlertDialogBox } from "@/components/custom/alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function EntryTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()
  const entry = balanceSheetEntrySchema.parse(row.original)

  async function onDelete(){
    const body = {
      itemId: entry._id as string,
    }
    const response = await removeEntry(body)
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
          <DialogTitle>Edit Enrty Form</DialogTitle>
          <DialogDescription>
            Edit the entry details in the balance sheet. Once done please click on the submit button.
          </DialogDescription>
        </DialogHeader>
        <EditEntryForm entry={entry} />
      </DialogContent>
    </Dialog>
  )
}