import { getInvoice } from '@/server/invoices'
import { InvoiceDetails } from '../../_data/schema'
import { InvoiceForm } from './_components/invoice-form'
import { getUser } from '@/server/user'
import { User } from '@/app/(application)/(routes)/profile/_data/schema'

async function getUserDetails() {
  const response = await getUser()
  if(response?.success){
    return response.data as User
  }
  return {} as User
}

async function getInvoiceDetails(invoiceId: string) {
  const response = await getInvoice(invoiceId)
  if(response?.success){
    return response.data as InvoiceDetails
  }
  return {} as InvoiceDetails
}

export default async function ViewInvoicePage({ params }: { params: { customerId: string, invoiceId: string } }){
  const user = await getUserDetails()
  const invoice = await getInvoiceDetails(params.invoiceId)

  return (
    <InvoiceForm user={user} invoice={invoice} />
  )
}