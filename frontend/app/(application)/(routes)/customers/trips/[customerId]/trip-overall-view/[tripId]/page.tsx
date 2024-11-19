import { getTripDetails } from "@/server/trips"
import { Trip } from "../../../_data/schema"
import { TripReport } from "./_components/trip-report"
import { getCustomerDetails } from "@/server/customer"
import { Customer } from "../../../../_data/schema"
import { getUser } from "@/server/user"
import { User } from "@/app/(application)/(routes)/profile/_data/schema"
import { PrintTripReport } from "./_components/print-trip-report"

async function getUserDetails() {
  const response = await getUser()
  if(response?.success){
    return response.data as User
  }
  return {} as User
}

async function getCustomer(customerId: string) {
  const response = await getCustomerDetails(customerId)
  if(response?.success){
    return response.data as Customer
  }
  return {} as Customer
}

async function getTrip(tripId: string) {
  const response = await getTripDetails(tripId)
  if(response?.success){
    return response.data as Trip
  }
  return {} as Trip
}


export default async function TripOverallView({ params }: { params: { customerId: string, tripId: string } }) {
  const user = await getUserDetails()
  const customer = await getCustomer(params.customerId)
  const trip = await getTrip(params.tripId)
  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Trip Report</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your complete trip report!
          </p>
        </div>
        <PrintTripReport user={user} customer={customer} trip={trip} />
      </div>
      <TripReport trip={trip} customer={customer} />
    </div>
  )
}