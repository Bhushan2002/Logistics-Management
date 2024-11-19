"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/custom/data-table-column-header";
import { BalanceSheetEntry } from "../_data/schema";
import { accountNames, statuses } from "../_data/data";
import { formatNumberToIndianReadble, reverseDateString } from "@/utils/utils";
import { EntryTableRowActions } from "./entry-table-row-actions";

export const entryTableColumns: ColumnDef<BalanceSheetEntry>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sr. No." />
    ),
    cell: ({ row }) => (
      <div className="max-w-[80px] truncate">
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
        <div className="flex w-[144px]">
          <span>{reverseDateString(row.getValue("date"))}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full flex">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "accountName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="A/C Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[144px]">
          <span className="truncate font-medium">{row.getValue("accountName")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = formatNumberToIndianReadble(row.original.amount)
      return (
        <div className="flex w-[144px]">
          <span className="truncate font-medium">₹ {amount}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.original.status);

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[144px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="truncate font-medium">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EntryTableRowActions row={row} />,
  },
];