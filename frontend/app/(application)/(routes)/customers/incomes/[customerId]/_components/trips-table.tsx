import { DataTable } from "@/components/custom/data-table";
import { tripsTableColumns } from "./trips-table-columns";
import { Trip } from "../../../trips/_data/schema";

type TripsTableProps = {
  trips: Trip[]
}

export async function TripsTable(props: TripsTableProps){
  return (
    <DataTable
      columns={tripsTableColumns}
      data={props.trips}
      searchColumn="primaryDetails_vehicleNumber"
      searchPlaceholder="Search by vehicle number"
    />
  )
}