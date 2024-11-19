import { getCustomerDetails } from "@/server/customer"
import { Customer } from "../../../customers/_data/schema"
import { Stats } from "./_components/stats"
import { getCustomerAllTrips } from "@/server/trips"
import { Trip } from "../../trips/_data/schema"
import { TripsTable } from "./_components/trips-table"
import { CustomerOptionsTabs } from "@/app/(application)/_components/customer-options-tabs"

async function getCustomer(customerId: string) {
  const response = await getCustomerDetails(customerId)
  if(response?.success){
    return response.data as Customer
  }
  return {} as Customer
}

async function getTrips(customerId: string) {
  const response = await getCustomerAllTrips(customerId)
  if(response?.success){
    return response.data?.trips as Trip[]
  }
  return [] as Trip[]
}

export default async function CustomerIncomesPage({ params }: { params: { customerId: string } }) {
  
  const customer = await getCustomer(params.customerId)
  const trips = await getTrips(params.customerId)
  const totalIncomeAmount = trips.reduce((accumulator, trip) => accumulator + trip.financeDetails.totalAmount, 0) ?? 0
  const totalDueAmount = trips.reduce((accumulator, trip) => accumulator + (trip.incomeDetails?.dueAmount || 0), 0) ?? 0

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{customer.companyDetails.name} Incomes</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your {customer.personalDetails.firstName} {customer.personalDetails.lastName} incomes information!
          </p>
        </div>
      </div>
      <CustomerOptionsTabs customerId={params.customerId} />
      <Stats totalIncomeAmount={totalIncomeAmount} totalDueAmount={totalDueAmount} />
      <TripsTable trips={trips} />
    </div>
  )
}