import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trip } from "../../../../_data/schema"
import { Customer } from "@/app/(application)/(routes)/customers/_data/schema"
import { uppercaseFirstCharacter } from "@/utils/utils"
import { Badge } from "@/components/ui/badge"
import { AtSign, PhoneCall } from "lucide-react"
import { statuses } from "../../../../_data/data"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

type TripReportPrimaryDetailsProps = {
  trip: Trip,
  customer: Customer,
}

function calculateStep(status: string) {
  switch (status) {
    case 'PENDING':
      return 1
    case 'IN_PROGRESS':
      return 2
    case 'COMPLETED':
      return 3
    default:
      return 1
  }
}

export function TripReportPrimaryDetails(props: TripReportPrimaryDetailsProps) {
  const status = statuses.find(status => status.value === props.trip.primaryDetails.status)
  const step = calculateStep(props.trip.primaryDetails.status)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Primary Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
          <div className="sm:flex lg:col-span-7">
            <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
              <img
                src="/box-truck.png"
                alt="truck"
                className="h-full w-full object-cover object-center sm:h-full sm:w-full bg-secondary p-4"
              />
            </div>

            <div className="mt-3 sm:ml-6 sm:mt-0">
              <h3 className="text-base font-medium flex items-center">
                {uppercaseFirstCharacter(props.customer.personalDetails.salutation)}. {props.customer.personalDetails.firstName} {props.customer.personalDetails.lastName}
                <Badge className="ml-2">{uppercaseFirstCharacter(props.customer.personalDetails.type)}</Badge>
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground flex items-center">
                <PhoneCall className="w-4 h-4 mr-2" />
                {props.customer.personalDetails.phone}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground flex items-center">
                <AtSign className="w-4 h-4 mr-2" />
                {props.customer.personalDetails.email}
              </p>
            </div>
          </div>

          <div className="mt-6 lg:col-span-5 lg:mt-0">
            <dl className="grid grid-cols-2 gap-x-6 text-sm">
              <div>
                <dt className="font-medium">Delivery</dt>
                <dd className="mt-3">
                  <span className="block text-muted-foreground">{props.trip.primaryDetails.from} &rarr; {props.trip.primaryDetails.to}</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Driver</dt>
                <dd className="mt-3 space-y-1 text-muted-foreground">
                  <p>{uppercaseFirstCharacter(props.trip.driverDetails.salutation)}. {props.trip.driverDetails.firstName} {props.trip.driverDetails.lastName}</p>
                  <p>{props.trip.driverDetails.phone}</p>
                </dd>
              </div>
            </dl>
          </div>

        </div>
        <div className="mt-6 border-t py-6 lg:py-8">
          <h4 className="sr-only">Status</h4>
          <p className="text-sm font-medium text-gray-900">
            Status
          </p>
          <div className="mt-6" aria-hidden="true">
            <Progress className="h-2" value={(step / 3) * 100} />
            <div className="mt-6 hidden grid-cols-3 text-sm font-medium text-muted-foreground sm:grid">
              <div className="text-indigo-600">
                Pending
              </div>
              <div className={cn(step > 1 ? 'text-primary' : '', 'text-center')}>
                In Progress
              </div>
              <div className={cn(step > 2 ? 'text-primary' : '', 'text-right')}>
                Completed
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}