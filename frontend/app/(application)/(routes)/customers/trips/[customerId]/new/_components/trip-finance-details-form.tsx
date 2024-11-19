"use client"

import { UseFormReturn } from "react-hook-form"
import { FormInput } from "@/components/custom/form-input"
import { Separator } from "@/components/ui/separator"
import { Trip } from "../../../_data/schema"
import { useEffect } from "react"
import { GSTToggle } from "./gst-toggle"

type TripFinanceDetailsFormProps = {
  form: UseFormReturn<Trip>
}


export function TripFinanceDetailsForm(props: TripFinanceDetailsFormProps){

  useEffect(() => {
    const units = props.form.watch("financeDetails.units")
    const rate = props.form.watch("financeDetails.rate")
    if(units > -1 && rate > -1){
      props.form.setValue("financeDetails.subTotalAmount", units * rate)
    }
  }, [props.form, props.form.watch("financeDetails.units"), props.form.watch("financeDetails.rate")])

  useEffect(() => {
    const subTotalAmount = props.form.watch("financeDetails.subTotalAmount")
    const isGST = props.form.watch("financeDetails.isGST")
    if(subTotalAmount  > -1){
      const gstPercentage = isGST ? props.form.watch("financeDetails.gstPercentage") ?? 0 : 0
      props.form.setValue("financeDetails.gstAmount", gstPercentage * subTotalAmount / 100)
    }
  }, [props.form, props.form.watch("financeDetails.subTotalAmount"), props.form.watch("financeDetails.isGST"), props.form.watch("financeDetails.gstPercentage")])

  useEffect(() => {
    const subTotalAmount = props.form.watch("financeDetails.subTotalAmount")
    const gstAmount = props.form.watch("financeDetails.gstAmount")
    if(subTotalAmount > -1 && gstAmount > -1){
      props.form.setValue("financeDetails.totalAmount", subTotalAmount + gstAmount)
    }
  }, [props.form, props.form.watch("financeDetails.subTotalAmount"), props.form.watch("financeDetails.gstAmount")])

  useEffect(() => {
    const totalAmount = props.form.watch("financeDetails.totalAmount")
    const advanceAmount = props.form.watch("financeDetails.advanceAmount")
    const commissionAmount = props.form.watch("financeDetails.commissionAmount")
    const tsdShortageAmount = props.form.watch("financeDetails.tsdShortageAmount")
    if(totalAmount > -1 && advanceAmount > -1 && commissionAmount > -1 && tsdShortageAmount > -1){
      props.form.setValue("financeDetails.dueAmount", totalAmount - advanceAmount - commissionAmount - tsdShortageAmount)
    }
  }, [props.form, props.form.watch("financeDetails.totalAmount"), props.form.watch("financeDetails.advanceAmount"), props.form.watch("financeDetails.commissionAmount"), props.form.watch("financeDetails.tsdShortageAmount")])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Finance Details of Trips</h3>
        <p className="text-sm text-muted-foreground">Manage and add finance details of trips.</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <FormInput
          form={props.form}
          name="financeDetails.units"
          label="Units"
          placeholder="KL/TON"
          type="number"
          className="sm:col-span-2"
        />
        <FormInput
          form={props.form}
          name="financeDetails.rate"
          label="Rate"
          placeholder="Enter the rate per unit"
          type="number"
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="financeDetails.subTotalAmount"
          label="Sub Total"
          placeholder="Enter the sub total amount"
          type="number"
          disabled={true}
          className="sm:col-span-5"
        />
        <GSTToggle
          form={props.form}
          name="financeDetails.isGST"
          label="GST"
          className="sm:col-span-12"
        />
        <div className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-4">
          {props.form.watch("financeDetails.isGST") && (
            <FormInput
              form={props.form}
              name="financeDetails.gstPercentage"
              label="GST Percentage"
              placeholder="Enter the gst percentage"
              type="number"
              className="sm:col-span-5"
            />
          )}
        </div>
        <FormInput
          form={props.form}
          name="financeDetails.gstAmount"
          label="GST Amount"
          placeholder="Enter the gst amount"
          type="number"
          disabled={true}
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="financeDetails.totalAmount"
          label="Total Amount"
          placeholder="Enter the total amount"
          type="number"
          disabled={true}
          className="sm:col-span-6"
        />
        <FormInput
          form={props.form}
          name="financeDetails.advanceAmount"
          label="Advance Amount"
          placeholder="Enter the advance amount"
          type="number"
          className="sm:col-span-4"
        />
        <FormInput
          form={props.form}
          name="financeDetails.commissionAmount"
          label="Comission Amount"
          placeholder="Enter the commission amount"
          type="number"
          className="sm:col-span-4"
        />
        <FormInput
          form={props.form}
          name="financeDetails.tsdShortageAmount"
          label="TSD/Shortage Amount"
          placeholder="Enter the tds/shortage amount"
          type="number"
          className="sm:col-span-4"
        />
        <FormInput
          form={props.form}
          name="financeDetails.courier"
          label="Courier"
          placeholder="Enter the courier of the trip"
          className="sm:col-span-5"
        />
        <FormInput
          form={props.form}
          name="financeDetails.dueAmount"
          label="Due Amount"
          placeholder="Enter the due amount"
          type="number"
          disabled={true}
          className="sm:col-span-5"
        />
      </div>
    </div>
  )
}