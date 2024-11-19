import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Trip } from "../_data/schema";
import { TripsTable } from "./_components/trips-table";
import { CustomerOptionsTabs } from "@/app/(application)/_components/customer-options-tabs";
import { getCustomerAllTrips } from "@/server/trips";
import { getCustomerDetails } from "@/server/customer";
import { Customer } from "../../_data/schema";

async function getTrips(customerId: string) {
  const response = await getCustomerAllTrips(customerId)
  if(response?.success){
    return response.data?.trips as Trip[]
  }
  return [] as Trip[]
}

async function getCustomer(customerId: string) {
  const response = await getCustomerDetails(customerId)
  if(response?.success){
    return response.data as Customer
  }
  return {} as Customer
}

export default async function CustomerTripsPage({ params }: { params: { customerId: string } }) {

  const customer = await getCustomer(params.customerId)
  const trips = await getTrips(params.customerId)


  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{customer.companyDetails?.name} Trips</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your {customer.personalDetails.firstName} {customer.personalDetails.lastName} trips information!
          </p>
        </div>
        <Link
          href={`/customers/trips/${params.customerId}/new?tab=primary`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add Trip
        </Link>
      </div>
      <CustomerOptionsTabs customerId={params.customerId} />
      <TripsTable trips={trips} />
    </div>
  )
}