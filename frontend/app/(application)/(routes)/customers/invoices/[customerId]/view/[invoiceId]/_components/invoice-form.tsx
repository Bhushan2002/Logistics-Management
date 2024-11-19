"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { InvoiceDetails, invoiceDetailsSchema } from "../../../_data/schema"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { salutations, statuses } from "../../../_data/data"
import { Separator } from "@/components/ui/separator"
import { FormTextarea } from "@/components/custom/form-textarea"
import { InvoiceItemsTable } from "./invoice-items-table"
import { Button } from "@/components/ui/button"
import { Pen, Printer, Save, Share } from "lucide-react"
import { useState } from "react"
import { updateInvoice } from "@/server/invoices"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { User } from "@/app/(application)/(routes)/profile/_data/schema"
import { PrintInvoice } from "./print-invoice"

type InvoiceFormProps = {
  user: User
  invoice: InvoiceDetails
}

export function InvoiceForm(props: InvoiceFormProps) {

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<InvoiceDetails>({
    resolver: zodResolver(invoiceDetailsSchema),
    defaultValues: props.invoice
  })

  const { fields: items, append: appendItem, prepend, remove: removeItem, swap, move, insert } = useFieldArray({
    control: form.control,
    name: "items"
  });

  async function onSubmit(values: InvoiceDetails) {
    setIsLoading(true)
    const response = await updateInvoice(props.invoice._id as string, values)
    if(response?.success){
      toast({
        title: "Success!",
        description: "Invoice updated successfully.",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
    setIsLoading(false)
  }


  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Invoice - &#35;{props.invoice.invoiceId?.toString().padStart(6, "0")}</h2>
          <p className="text-muted-foreground">
            Easily manage invoice details for your customers.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button disabled={isLoading} type="submit" onClick={form.handleSubmit(onSubmit)}>
            <Pen className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {/* <Button className="bg-emerald-600 hover:bg-emerald-500" disabled={isLoading} type="button">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button> */}
          <PrintInvoice invoice={props.invoice} user={props.user} />
        </div>
      </div>
      <Separator className="my-6" />
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex justify-between">
            <div className="">
              <FormInput
                form={form}
                name="invoiceId"
                placeholder="Invoice ID"
                type="number"
              />
            </div>
            <div className="">
              <FormSelect
                form={form}
                name="invoiceStatus"
                placeholder="Status"
                options={statuses}
              />
              <FormInput
                form={form}
                name="date"
                placeholder="Date"
              />
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="">
              <p className="mt-2 text-sm font-semibold">Bill From</p>
              <div className="flex space-x-2 mt-2">
                <FormSelect
                  form={form}
                  name="billFrom.salutation"
                  placeholder="Select a salutation"
                  options={salutations}
                  className="w-[90px]"
                />
                <FormInput
                  form={form}
                  name="billFrom.name"
                  placeholder="Enter your name"
                />
              </div>
              <FormTextarea
                form={form}
                name="billFrom.address"
                placeholder="Enter your address"
              />
              <FormInput
                form={form}
                name="billFrom.phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="">
            <p className="text-sm font-semibold text-right">Bill To</p>
              <div className="flex space-x-2 mt-2">
                <FormSelect
                  form={form}
                  name="billTo.salutation"
                  placeholder="Select a salutation"
                  options={salutations}
                  className="w-[90px]"
                />
                <FormInput
                  form={form}
                  name="billTo.name"
                  placeholder="Enter customer name"
                />
              </div>
              <FormTextarea
                form={form}
                name="billTo.address"
                placeholder="Enter customer address"
              />
              <FormInput
                form={form}
                name="billTo.phone"
                placeholder="Enter your customer number"
              />
            </div>
          </div>
          <Separator />
          <InvoiceItemsTable items={items} form={form} appendItem={appendItem} removeItem={removeItem} />
          <FormTextarea
            form={form}
            name="note"
            label="Note"
            placeholder="Enter a note for your customer"
          />
        </form>
      </Form>
    </div>
  )
}