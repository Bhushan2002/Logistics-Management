import { DataTable } from "@/components/custom/data-table";
import { CustomerWithTrip, Trip } from "../_data/schema";
import { tripsTableColumns } from "./trips-table-columns";

type TripsTableProps = {
  customerWithTrips: CustomerWithTrip[]
}

export async function TripsTable(props: TripsTableProps) {
  return (
    <DataTable
      columns={tripsTableColumns}
      data={props.customerWithTrips}
      filters={[]}
    />
  )
}