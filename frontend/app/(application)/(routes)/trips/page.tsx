import { CustomerWithTrip, Trip } from "./_data/schema";
import { TripsTable } from "./_components/trips-table";
import { getUserAllTrips } from "@/server/trips";
import { Customer } from "../customers/_data/schema";

async function getTrips() {
  const response = await getUserAllTrips()
  if(response?.success){
    return response.data?.customers as Customer[]
  }
  return [] as Customer[]
}

function manipulateTripsData(customers: Customer[]){
  const trips = [] as CustomerWithTrip[]
  customers.forEach(customer => {
    customer.trips?.map(trip => {
      trips.push({
        customer: {
          _id: customer._id,
          personalDetails: customer.personalDetails,
          companyDetails: customer.companyDetails
        },
        trip: trip
      } as CustomerWithTrip)
    })
  })
  return trips
}

function sortTripsAccordingToDates(trips: CustomerWithTrip[]){
  const sortedTrips = trips.sort((a, b) => {
    const dateA = new Date(a.trip.primaryDetails.date);
    const dateB = new Date(b.trip.primaryDetails.date);
    return dateB.getTime() - dateA.getTime();
  })

  return sortedTrips as CustomerWithTrip[]
}

export default async function CustomerTripsPage() {

  const customers = await getTrips()
  const customerWithTrips = manipulateTripsData(customers)
  const sortedTrips = sortTripsAccordingToDates(customerWithTrips)

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Trips</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your trips information!
          </p>
        </div>
      </div>
      <TripsTable customerWithTrips={sortedTrips} />
    </div>
  )
}