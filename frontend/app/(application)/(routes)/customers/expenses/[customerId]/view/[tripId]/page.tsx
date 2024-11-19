import { Expense } from "./_data/schema";
import { AddExpense } from "./_components/add-expense";
import { Stats } from "./_components/stats";
import { ExpensesTable } from "./_components/expenses-table";
import { getTripExpense } from "@/server/expenses";

async function getExpense(tripId: string) {
  const response = await getTripExpense(tripId)
  if (response?.success) {
    return response.data?.expenseDetails as Expense
  }
  return {} as Expense
}

export default async function TripExpensesPage({ params }: { params: { customerId: string, tripId: string } }) {
  const expense = await getExpense(params.tripId)
  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Easily manage and create a trip expenses!
          </p>
        </div>
        <AddExpense />
      </div>
      <Stats totalAmount={expense?.totalAmount ?? 0} />
      <ExpensesTable expenses={expense?.items ?? []} />
    </div>
  )
}