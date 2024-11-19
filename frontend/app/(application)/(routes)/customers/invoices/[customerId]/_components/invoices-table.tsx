import { DataTable } from "@/components/custom/data-table";
import { InvoiceDetails } from "../_data/schema";
import { invoicesTableColumns } from "./invoices-table-columns";

type InvoicesTableProps = {
  invoices: InvoiceDetails[]
}

export async function InvoicesTable(props: InvoicesTableProps){
  return (
    <DataTable
      columns={invoicesTableColumns}
      data={props.invoices}
      searchColumn="billTo_name"
      searchPlaceholder="Search by customer name"
    />
  )
}