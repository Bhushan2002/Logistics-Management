import { DataTable } from "@/components/custom/data-table";
import { entryTableColumns } from "./entry-table-columns";
import { filters } from "../_data/filters";
import { BalanceSheetEntry } from "../_data/schema";

type EntryTableProps = {
  entries: BalanceSheetEntry[]
}

export async function EntryTable(props: EntryTableProps){
  return (
    <DataTable
      columns={entryTableColumns}
      data={props.entries}
      searchColumn="title"
      searchPlaceholder="Search by title"
      filters={filters}
    />
  )
}