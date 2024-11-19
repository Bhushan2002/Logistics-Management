import { DetailsForm } from './_components/details-form'
import { Customer } from '../../_data/schema'
import { getCustomerDetails } from '@/server/customer'

async function getCustomer(id: string) {
  const response = await getCustomerDetails(id)
  if(response?.success){
    return response.data as Customer
  }
  return {} as Customer
}

export default async function AddCustomerPage({ params }: { params: { customerId: string } }) {
  const customer = await getCustomer(params.customerId)
  
  return (
    <DetailsForm customer={customer} />
  )
}