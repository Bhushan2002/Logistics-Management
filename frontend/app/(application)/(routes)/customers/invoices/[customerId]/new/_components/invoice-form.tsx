"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { InvoiceDetails, invoiceDetailsSchema } from "../../_data/schema"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/custom/form-input"
import { FormSelect } from "@/components/custom/form-select"
import { salutations, statuses } from "../../_data/data"
import { Separator } from "@/components/ui/separator"
import { FormTextarea } from "@/components/custom/form-textarea"
import { InvoiceItemsTable } from "./invoice-items-table"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { User } from "@/app/(application)/(routes)/profile/_data/schema"
import { Customer } from "@/app/(application)/(routes)/customers/_data/schema"
import { useState } from "react"
import { createInvoice } from "@/server/invoices"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type InvoiceFormProps = {
  user: User,
  customer: Customer
}

export function InvoiceForm(props: InvoiceFormProps) {

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<InvoiceDetails>({
    resolver: zodResolver(invoiceDetailsSchema),
    defaultValues: {
      billFrom: {
        salutation: props.user.personalDetails.salutation,
        name: props.user.personalDetails.firstName + " " + props.user.personalDetails.lastName,
        address: props.user.companyDetails.address,
        phone: props.user.companyDetails.phone,
      },
      billTo: {
        salutation: props.customer.personalDetails.salutation,
        name: props.customer.personalDetails.firstName + " " + props.customer.personalDetails.lastName,
        address: props.customer.companyDetails.address,
        phone: props.customer.companyDetails.phone,
      },
      invoiceStatus: "UNPAID",
      subTotal: 0,
      gstPercentage: 0,
      gstAmount: 0,
      grandTotal: 0,
      totalAdvanceAmount: 0,
    }
  })

  const { fields: items, append: appendItem, prepend, remove: removeItem, swap, move, insert } = useFieldArray({
    control: form.control,
    name: "items"
  });

  async function onSubmit(values: InvoiceDetails) {
    const body = {
      customerId: props.customer._id as string,
      ...values
    }
    setIsLoading(true)
    const response = await createInvoice(body)
    setIsLoading(false)
    if(response?.success) {
      router.push(`/customers/invoices/${props.customer._id}`)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
  }


  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Add New Invoice</h2>
          <p className="text-muted-foreground">
            Easily manage and create invoice for your customers.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            <Save className="w-4 h-4 mr-2" />
            Submit
          </Button>
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
                type="date"
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
