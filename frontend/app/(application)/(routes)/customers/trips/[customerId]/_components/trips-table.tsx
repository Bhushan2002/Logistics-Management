import { DataTable } from "@/components/custom/data-table";
import { Trip } from "../../_data/schema";
import { tripsTableColumns } from "./trips-table-columns";
import { filters } from "../../_data/filters";

type TripsTableProps = {
  trips: Trip[]
}

export async function TripsTable(props: TripsTableProps) {
  return (
    <DataTable
      columns={tripsTableColumns}
      data={props.trips}
      searchColumn="primaryDetails_vehicleNumber"
      searchPlaceholder="Search by vehicle number"
      filters={filters}
    />
  )
}