"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/custom/data-table-column-header";
import { IncomeItem } from "../_data/schema";
import { modes } from "../_data/data";
import { IncomesTableRowActions } from "./incomes-table-row-actions";

export const incomesTableColumns: ColumnDef<IncomeItem>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sr. No." />
    ),
    cell: ({ row }) => (
      <div className="max-w-[80px] truncate font-medium">
        {row.index + 1}
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
        <div className="flex w-[100px] space-x-2">
          <span className="truncate font-medium">{row.getValue("date")}</span>
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
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
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
      return (
        <div className="flex w-[100px] space-x-2">
          <span className="truncate font-medium">{row.getValue("amount")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "mode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode" />
    ),
    cell: ({ row }) => {
      const mode = modes.find((mode) => mode.value === row.original.mode);

      if(!mode) {
        return null;
      }

      return (
        <div className="flex w-[100px] space-x-2 items-center">
          {mode.icon && (
            <mode.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="truncate font-medium">{mode.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <IncomesTableRowActions row={row} />,
  },
];