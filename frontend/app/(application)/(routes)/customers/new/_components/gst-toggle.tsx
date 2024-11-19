import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { getUser } from "@/server/user"
import { useEffect, useState } from "react"

type GSTToggleProps<T extends FieldValues> = {
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  label: string,
  disabled?: boolean | false,
  className?: string,
}

export function GSTToggle<T extends FieldValues>(props: GSTToggleProps<T>){

  const [gstPercentage, setGSTPercentage] = useState<number>(0)

  useEffect(() => {
    async function getGSTPercentage(){
      const response = await getUser()
      if(response?.success){
        setGSTPercentage(response.data?.companyDetails.gstPercentage as number)
        return
      }
      setGSTPercentage(0)
      return
    }
    getGSTPercentage()
  })

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn(props.className)}>
          <FormLabel>{props.label}</FormLabel>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                GST
              </FormLabel>
              <FormDescription>
                Is {gstPercentage}% gst applicable for this customer?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={!!field.value}
                disabled={props.disabled}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}