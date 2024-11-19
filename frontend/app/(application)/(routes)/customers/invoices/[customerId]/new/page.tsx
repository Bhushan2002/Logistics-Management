import { getUser } from '@/server/user'
import { InvoiceForm } from './_components/invoice-form'
import { User } from '../../../../profile/_data/schema'
import { getCustomerDetails } from '@/server/customer'
import { Customer } from '../../../../customers/_data/schema'

async function getUserDetails() {
  const response = await getUser()
  if(response?.success){
    return response.data as User
  }
  return {} as User
}

async function getCustomer(customerId: string) {
  const response = await getCustomerDetails(customerId)
  if(response?.success){
    return response.data as Customer
  }
  return {} as Customer
}

export default async function AddNewInvoicePage({ params }: { params: { customerId: string } }){
  const user = await getUserDetails()
  const customer = await getCustomer(params.customerId)
  
  return (
    <InvoiceForm user={user} customer={customer} />
  )
}