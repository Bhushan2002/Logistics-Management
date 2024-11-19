import { getCustomerDetails } from "@/server/customer"
import { Customer } from "../../../customers/_data/schema"
import { CustomerOptionsTabs } from "@/app/(application)/_components/customer-options-tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { InvoicesTable } from "./_components/invoices-table"
import { getCustomerAllInvoices } from "@/server/invoices"
import { InvoiceDetails } from "./_data/schema"

async function getCustomer(customerId: string) {
  const response = await getCustomerDetails(customerId)
  if(response?.success){
    return response.data as Customer
  }
  return {} as Customer
}

async function getInvoices(customerId: string) {
  const response = await getCustomerAllInvoices(customerId)
  if(response?.success){
    return response.data?.invoices as InvoiceDetails[]
  }
  return [] as InvoiceDetails[]
}

export default async function CustomerInvoicesPage({ params }: { params: { customerId: string } }) {

  const customer = await getCustomer(params.customerId)
  const invoices = await getInvoices(params.customerId)

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{customer.companyDetails?.name} Invoices</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your {customer.personalDetails?.firstName} {customer.personalDetails.lastName} invoices information!
          </p>
        </div>
        <Link
          href={`/customers/invoices/${params.customerId}/new`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add Invoice
        </Link>
      </div>
      <CustomerOptionsTabs customerId={params.customerId} />
      <InvoicesTable invoices={invoices} />
    </div>
  )
}