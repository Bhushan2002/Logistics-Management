"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"
import { PrimaryDetailsTrip, tripSchema } from "../../_data/schema"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { removeTrip, updateTripDetails } from "@/server/trips"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { AlertDialogBox } from "@/components/custom/alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function TripsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()
  const trip = tripSchema.parse(row.original)
  const pathname = usePathname()
  const customerId = pathname.split("/")[3]

  async function onDelete() {
    const body = {
      tripId: trip._id as string,
      customerId: customerId as string,
    }
    const response = await removeTrip(body)
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

  
  async function onStatusChange(status: string) {
    const body = {
      primaryDetails: {
        ...trip.primaryDetails,
        status: status as PrimaryDetailsTrip["status"]
      } 
    }
    const response = await updateTripDetails(trip._id as string, body)
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
          <Link href={`/customers/trips/${customerId}/view/${trip._id}?tab=primary`} className="w-full h-full">
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/customers/trips/${customerId}/trip-overall-view/${trip._id}`} className="w-full h-full">
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Status
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={trip.primaryDetails.status} onValueChange={onStatusChange}>
                <DropdownMenuRadioItem value="PENDING">Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="IN_PROGRESS">In progress</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="COMPLETED">Completed</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <AlertDialogBox buttonText="Delete" onClickAction={onDelete} />
      </DropdownMenuContent>
    </DropdownMenu>

  )
}