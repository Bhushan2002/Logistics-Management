import { Icon } from "@/components/custom/icon"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import dynamicIconImports from 'lucide-react/dynamicIconImports';


type StatCardProps = {
  title: string,
  value: string,
  icon?: keyof typeof dynamicIconImports;
  iconColor?: string | "text-muted-foreground",
  description?: string
}

export function StatCard(props: StatCardProps){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {props.title}
        </CardTitle>
        {props.icon && <Icon name={props.icon} className={cn("h-4 w-4", props.iconColor)} />}
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