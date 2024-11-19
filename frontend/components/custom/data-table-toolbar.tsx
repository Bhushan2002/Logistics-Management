"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import React from "react"
import { X } from "lucide-react"

type FilterProps = {
  column: string,
  title: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  searchColumn?: string,
  searchPlaceholder?: string,
  filters?: FilterProps[]
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder,
  filters
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="hidden lg:flex items-center justify-between">
      {searchColumn && searchPlaceholder && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {filters && filters.map((filter, index) => {
            return table.getColumn(filter.column) && (
              <DataTableFacetedFilter
                key={index}
                column={table.getColumn(filter.column)}
                title={filter.title}
                options={filter.options}
              />
            )
          })}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      <DataTableViewOptions table={table} />
    </div>
  )
}