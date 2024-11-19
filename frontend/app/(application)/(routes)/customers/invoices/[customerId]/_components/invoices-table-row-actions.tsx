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
import { usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { invoiceDetailsSchema } from "../_data/schema"
import { removeInvoice } from "@/server/invoices"
import Link from "next/link"
import { AlertDialogBox } from "@/components/custom/alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function InvoicesTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()
  const invoiceDetails = invoiceDetailsSchema.parse(row.original)
  const pathname = usePathname()
  const customerId = pathname.split("/")[3]

  async function onDelete() {
    const body = {
      customerId: customerId as string,
      invoiceId: invoiceDetails._id as string,
    }
    const response = await removeInvoice(body)
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
        <DropdownMenuItem>
          <Link className="w-full h-full" href={`/customers/invoices/${customerId}/view/${invoiceDetails._id}`}>
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialogBox buttonText="Delete" onClickAction={onDelete} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}