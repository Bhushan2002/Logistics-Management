import { DetailsForm } from './_components/details-form'
import { User } from './_data/schema'
import { getUser } from '../../../../server/user'

export const dynamic = "force-dynamic"

async function getUserDetails(){
  const response = await getUser()
  if(response?.success){
    return response.data as User
  }
  return {} as User
}

export default async function ProfilePage() {
  const user = await getUserDetails()
  return (
    <DetailsForm user={user} />
  )
}