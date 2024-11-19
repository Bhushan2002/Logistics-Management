import { DataTable } from "@/components/custom/data-table";
import { IncomeItem } from "../_data/schema";
import { incomesTableColumns } from "./incomes-table-columns";

type IncomesTableProps = {
  incomes: IncomeItem[]
}

export async function IncomesTable(props: IncomesTableProps){
  return (
    <DataTable
      columns={incomesTableColumns}
      data={props.incomes ?? []}
      searchColumn="title"
      searchPlaceholder="Search by title"
    />
  )
}