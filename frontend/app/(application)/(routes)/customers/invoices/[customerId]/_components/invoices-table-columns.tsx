"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/custom/data-table-column-header";
import { formatNumberToIndianReadble, reverseDateString } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { InvoiceDetails } from "../_data/schema";
import { statuses } from "../_data/data";
import { InvoicesTableRowActions } from "./invoices-table-row-actions";

export const invoicesTableColumns: ColumnDef<InvoiceDetails>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sr. No." />
    ),
    cell: ({ row }) => (
      <div className="max-max-w-[80px] truncate">
        <span className="truncate font-medium">
          {row.index + 1}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[144px] space-x-2">
          <span>{reverseDateString(row.getValue("date"))}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "billTo.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      const invoiceId = row.original.invoiceId?.toString().padStart(6, "0");
      return (
        <div className="flex space-x-2">
          {invoiceId && <Badge variant="outline">&#35;{invoiceId}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("billTo_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "billTo.phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[144px] space-x-2">
          <span className="truncate font-medium">{row.getValue("billTo_phone")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "grandTotal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grand Total" />
    ),
    cell: ({ row }) => {
      const isGST = row.original.gstPercentage > 0
      return (
        <div className="flex items-center w-[144px] space-x-2">
          {isGST && <Badge variant="secondary">GST</Badge>}
          <span className="truncate font-medium">₹ {formatNumberToIndianReadble(row.getValue("grandTotal"))}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "invoiceStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.original.invoiceStatus);

      if(!status) {
        return null
      }

      return (
        <div className="flex items-center w-[144px] space-x-2">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4" />
          )}
          <span className="truncate font-medium">{status.label}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <InvoicesTableRowActions row={row} />,
  },
];