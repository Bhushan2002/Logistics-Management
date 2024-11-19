"use client";

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Customer } from "../_data/schema"
import { ChevronDown, TrendingDown, TrendingUp, Truck, User } from "lucide-react"
import { formatNumberToIndianReadble } from "@/utils/utils"
import { salutations, types } from "../_data/data"
import Link from "next/link"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge";
import { removeCustomer } from "@/server/customer";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { getCustomerAllTrips, getTripDetails } from "@/server/trips";
import { Trip } from "../../trips/_data/schema";
import { AlertDialogBox } from "@/components/custom/alert-dialog";

type CustomerCardProps = {
  customer: Customer
}

export function CustomerCard(props: CustomerCardProps){

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const { toast } = useToast()
  const [trips, setTrips] = React.useState<Trip[]>([])

  React.useEffect(() => {
    async function getTrip(){
      const response = await getCustomerAllTrips(props.customer._id as string)
      if(response?.success){
        setTrips(response.data?.trips as Trip[])
      } else {
        setTrips([])
      }
    }

    getTrip()
  }, [props.customer._id])

  const salutation = salutations.find(salutation => salutation.value === props.customer.personalDetails.salutation)
  const type = types.find(type => type.value === props.customer.personalDetails.type)
  const totalDueAmount = trips?.reduce((accumulator, currentValue) => accumulator + (currentValue.incomeDetails?.dueAmount || 0), 0) ?? 0
  const totalIncomeAmount = trips?.reduce((accumulator, currentValue) => accumulator + currentValue.financeDetails.totalAmount, 0) ?? 0
  const totalPendingTrips = trips?.filter(trip => trip.primaryDetails.status === "PENDING")?.length ?? 0
  const totalInProgressTrips = trips?.filter(trip => trip.primaryDetails.status === "IN_PROGRESS")?.length ?? 0
  const totalCompletedTrips = trips?.filter(trip => trip.primaryDetails.status === "COMPLETED")?.length ?? 0

  const totalInvoices = props.customer.invoices?.length ?? 0

  async function onClickDelete(){
    const response = await removeCustomer(props.customer._id as string)
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
    <Card className="shadow-md">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold leading-none tracking-tight">{props.customer.companyDetails.name}</CardTitle>
          <CardDescription>
            {salutation?.label}{" "}{props.customer.personalDetails.firstName}{" "}{props.customer.personalDetails.lastName}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <Truck className="mr-2 h-4 w-4" /> 
            {totalPendingTrips + totalInProgressTrips + totalCompletedTrips}
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDown className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuItem>
                <Link href={`/customers/view/${props.customer._id}?tab=personal`} className="w-full h-full">
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/customers/trips/${props.customer._id}`} className="w-full h-full flex justify-between">
                  Trips
                  <div className="flex justify-center items-center space-x-0.5">
                    <Badge variant="secondary" className="text-red-600 bg-red-50">{totalPendingTrips}</Badge>
                    <Badge variant="secondary" className="text-yellow-600 bg-yellow-50">{totalInProgressTrips}</Badge>
                    <Badge variant="secondary" className="text-green-600 bg-green-50">{totalCompletedTrips}</Badge>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/customers/invoices/${props.customer._id}`} className="w-full h-full flex justify-between">
                  Invoices
                  <Badge variant="secondary">{totalInvoices}</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/customers/incomes/${props.customer._id}`} className="w-full h-full">
                  Incomes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/customers/expenses/${props.customer._id}`} className="w-full h-full">
                  Expenses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogBox buttonText="Delete" onClickAction={onClickDelete} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingDown className="mr-2 h-4 w-4 text-secondary-foreground"/>
              <span>Due Amount</span>
            </div>
            <p className="font-semibold text-red-600">Rs {formatNumberToIndianReadble(totalDueAmount)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-secondary-foreground"/>
              <span>Income Amount</span>
            </div>
            <p className="font-semibold text-green-600">Rs {formatNumberToIndianReadble(totalIncomeAmount)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-muted-foreground">
          <User className="mr-1 h-3 w-3" />
          <span className="text-sm">
            {type?.label}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}