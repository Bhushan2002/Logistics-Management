import { getTripIncome } from "@/server/incomes";
import { AddIncome } from "./_components/add-income";
import { Income } from "./_data/schema";
import { Stats } from "./_components/stats";
import { IncomesTable } from "./_components/incomes-table";

async function getIncome(tripId: string) {
  const response = await getTripIncome(tripId)
  if(response?.success){
    return response.data?.incomeDetails as Income
  }
  return {} as Income
}

export default async function TripIncomesPage({ params }: { params: { customerId: string, tripId: string } }) {
  const income = await getIncome(params.tripId)
  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Incomes</h2>
          <p className="text-muted-foreground">
            Easily manage and create a trip income!
          </p>
        </div>
        <AddIncome />
      </div>
      <Stats totalAmount={income?.totalAmount ?? 0} dueAmount={income?.dueAmount ?? 0} />
      <IncomesTable incomes={income?.items ?? []} />
    </div>
  )
}