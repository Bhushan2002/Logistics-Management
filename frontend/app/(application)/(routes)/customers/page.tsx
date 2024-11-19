import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CustomerCard } from "./_components/customer-card";
import { Customer } from "./_data/schema";
import { getAllCustomers } from "@/server/customer";

export const dynamic = "force-dynamic"

async function getCustomers(){
  const response = await getAllCustomers()
  if(response?.success){
    return response.data?.customers as Customer[]
  }
  return [] as Customer[]
}

export default async function CustomersPage(){

  const customers = await getCustomers()

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Here&apos;s is your customers information!
          </p>
        </div>
        <Link
          href="/customers/new?tab=personal"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add Customer
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer, index: number) => (
          <CustomerCard key={index} customer={customer} />
        ))}
      </div>
    </div>
  )
}