import { getBalanceSheet } from "../../../../server/balance-sheet";
import { AddEntry } from "./_components/add-entry";
import { CreateEntry } from "./_components/create-entry";
import { EntryTable } from "./_components/entry-table";
import { Stats } from "./_components/stats";
import { BalanceSheet } from "./_data/schema";

async function getBalanceSheetData(){
  const response = await getBalanceSheet()
  if(response?.success){
    return response.data
  }
  return {} as BalanceSheet
}

export default async function BalanceSheetPage(){

  const balanceSheet = await getBalanceSheetData()
  const stats = {
    totalCreditedAmount: balanceSheet?.totalCreditedAmount,
    totalDebitedAmount: balanceSheet?.totalDebitedAmount,
  }
  const entries = balanceSheet?.items?.reverse() ?? []

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Balance Sheet</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your balance sheet information!
          </p>
        </div>
        {balanceSheet && Object.keys(balanceSheet).length === 0 && <CreateEntry />}
        {balanceSheet && Object.keys(balanceSheet).length !== 0 && <AddEntry />}
      </div>
      <Stats stats={stats} />
      <EntryTable entries={entries} />
    </div>
  )
}