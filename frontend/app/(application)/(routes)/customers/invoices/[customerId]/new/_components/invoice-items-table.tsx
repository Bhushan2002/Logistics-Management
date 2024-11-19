"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { InvoiceDetails, ItemDetails } from "../../_data/schema";
import { FieldArrayWithId, FieldValues, Path, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


type InvoiceItemsTableProps = {
  items: FieldArrayWithId<ItemDetails>[],
  form: UseFormReturn<InvoiceDetails>,
  appendItem: UseFieldArrayAppend<InvoiceDetails>,
  removeItem: UseFieldArrayRemove
}

export function InvoiceItemsTable(props: InvoiceItemsTableProps) {

  useEffect(() => {
    const gstPercentage = props.form.watch("gstPercentage")
    const subTotal = props.form.watch("subTotal")
    const gstAmount = props.form.watch("gstAmount")
    const totalAdvanceAmount = props.form.watch("totalAdvanceAmount")
    if(subTotal > -1){
      props.form.setValue("gstAmount", subTotal * (gstPercentage / 100))
    }
    if(subTotal > -1 && gstAmount > -1){
      props.form.setValue("grandTotal", subTotal + gstAmount - totalAdvanceAmount)
    }
  }, [props.form.watch("subTotal"), props.form.watch("gstPercentage"), props.form.watch("gstAmount"), props.form.watch("totalAdvanceAmount")])


  function watchItem(index: number) {
    const units = props.form.watch(`items.${index}.units`)
    const rate = props.form.watch(`items.${index}.rate`)
    const detention = props.form.watch(`items.${index}.detention`)
    if (units && rate) {
      props.form.setValue(`items.${index}.total`, units * rate)
      props.form.setValue(`items.${index}.grandTotal`, units * rate + detention)
      const items = props.form.getValues("items")
      const subTotal = items?.reduce((acc: number, item: ItemDetails) => {
        return acc + item.grandTotal
      }, 0)
      props.form.setValue("subTotal", subTotal ?? 0)
    }
    const advance = props.form.watch(`items.${index}.advance`)
    if(advance > 0) {
      const items = props.form.getValues("items")
      const totalAdvanceAmount = items?.reduce((acc: number, item: ItemDetails) => {
        return acc + item.advance
      }, 0)
      props.form.setValue("totalAdvanceAmount", totalAdvanceAmount ?? 0)
    }
  }

  return (
    <Table>
      <TableCaption>A list of your items in this invoice.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[75px]">Sr. No.</TableHead>
          <TableHead className="min-w-[100px]">Vehicle No.</TableHead>
          <TableHead className="min-w-[100px]">Date</TableHead>
          <TableHead className="min-w-[100px]">From</TableHead>
          <TableHead className="min-w-[100px]">To</TableHead>
          <TableHead className="min-w-[100px]">Lr. No.</TableHead>
          <TableHead className="min-w-[100px]">Units</TableHead>
          <TableHead className="min-w-[100px]">Rate</TableHead>
          <TableHead className="min-w-[100px]">Total</TableHead>
          <TableHead className="min-w-[100px]">Detention</TableHead>
          <TableHead className="min-w-[100px]">Grand Total</TableHead>
          <TableHead className="min-w-[100px]">Advance</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.items.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="w-[75px]">{index + 1}</TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.vehicleNumber`}
                placeholder="Vehicle Number"
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.date`}
                placeholder="Date"
                type="date"
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.from`}
                placeholder="From"
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.to`}
                placeholder="To"
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.lrNumber`}
                placeholder="Lr. No."
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormField
                control={props.form.control}
                name={`items.${index}.units`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Units"
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value))
                          watchItem(index)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormField
                control={props.form.control}
                name={`items.${index}.rate`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rate"
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value))
                          watchItem(index)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.total`}
                placeholder="Total"
                type="number"
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormField
                control={props.form.control}
                name={`items.${index}.detention`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Detention"
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value))
                          watchItem(index)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormInput
                form={props.form}
                name={`items.${index}.grandTotal`}
                placeholder="Grand Total"
                type="number"
              />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <FormField
                control={props.form.control}
                name={`items.${index}.advance`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Advance"
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value))
                          watchItem(index)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell>
              <Button size="icon" variant="destructive" onClick={() => props.removeItem(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={12} className="text-right">
            <Button
              variant="outline"
              type="button"
              onClick={() => props.appendItem({
                vehicleNumber: "",
                date: "",
                from: "",
                to: "",
                lrNumber: "",
                units: 0,
                rate: 0,
                total: 0,
                detention: 0,
                grandTotal: 0,
                advance: 0,
              })}
            >Add Item</Button>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter className="bg-white">
        <TableRow>
          <TableCell colSpan={10}>Sub Total</TableCell>
          <TableCell colSpan={2} className="text-right">
            <FormInput
              form={props.form}
              name="subTotal"
              placeholder="Sub Total"
              type="number"
              disabled={true}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>GST (%)</TableCell>
          <TableCell colSpan={2} className="text-right">
            <FormInput
              form={props.form}
              name="gstPercentage"
              placeholder="GST (%)"
              type="number"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>GST Amount</TableCell>
          <TableCell colSpan={2} className="text-right">
            <FormInput
              form={props.form}
              name="gstAmount"
              placeholder="GST amount"
              type="number"
              disabled={true}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>Basic Amount</TableCell>
          <TableCell colSpan={2} className="text-right">
            <Input
              type="number"
              placeholder="Basic amount"
              disabled={true}
              value={props.form.watch("subTotal") + props.form.watch("gstAmount")}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>Total Advance</TableCell>
          <TableCell colSpan={2} className="text-right">
            <FormInput
              form={props.form}
              name="totalAdvanceAmount"
              placeholder="Total adavance"
              type="number"
              disabled={true}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>Grand Total</TableCell>
          <TableCell colSpan={2} className="text-right">
            <FormInput
              form={props.form}
              name="grandTotal"
              placeholder="Grand total"
              type="number"
              disabled={true}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}