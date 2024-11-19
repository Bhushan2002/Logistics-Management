import { BalanceSheetReportCard } from "./_components/balance-sheet-report-card";
import { ExpenseReportCard } from "./_components/expense-report-card";
import { IncomeReportCard } from "./_components/income-report-card";
import { NetProfitAndLossReportCard } from "./_components/net-profit-and-loss-report-card";
import { TripsReportCard } from "./_components/trips-report-card";

export default async function ReportsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Easily manage reports for your customers.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <TripsReportCard />
        <NetProfitAndLossReportCard />
        <IncomeReportCard />
        <ExpenseReportCard />
        <BalanceSheetReportCard />
      </div>
    </div>
  )
}