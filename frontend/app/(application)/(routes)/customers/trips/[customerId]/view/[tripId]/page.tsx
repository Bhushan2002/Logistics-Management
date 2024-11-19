import { getTripDetails } from "@/server/trips";
import { Trip } from "../../../_data/schema";
import { DetailsForm } from "./_components/details-form";

async function getTrip(tripId: string) {
  const response = await getTripDetails(tripId)
  if(response?.success){
    return response.data as Trip
  }
  return {} as Trip
}


export default async function ViewCustomerTripPage({ params }: {params: {customerId: string, tripId: string}}) {
  
  const trip = await getTrip(params.tripId)

  return (
    <DetailsForm data={trip} />
  )
}