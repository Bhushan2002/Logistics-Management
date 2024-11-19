import { Icon } from "@/components/custom/icon"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import dynamicIconImports from 'lucide-react/dynamicIconImports';


type StatCardType = {
  title: string,
  iconName?: keyof typeof dynamicIconImports;
  iconColor?: string,
  value?: string,
  description?: string
}

export function StatCard(props: StatCardType){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {props.title}
        </CardTitle>
        {props.iconName && <Icon name={props.iconName} className="h-5 w-5" color={props.iconColor} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="text-xs text-muted-foreground">
          {props.description}
        </p>
      </CardContent>
    </Card>
  )
}