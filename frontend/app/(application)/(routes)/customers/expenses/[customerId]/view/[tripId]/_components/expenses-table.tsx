import { DataTable } from "@/components/custom/data-table";
import { ExpenseItem } from "../_data/schema";
import { expensesTableColumns } from "./expenses-table-columns";

type ExpensesTableProps = {
  expenses: ExpenseItem[]
}

export async function ExpensesTable(props: ExpensesTableProps){
  return (
    <DataTable
      columns={expensesTableColumns}
      data={props.expenses ?? []}
      searchColumn="title"
      searchPlaceholder="Search by title"
    />
  )
}