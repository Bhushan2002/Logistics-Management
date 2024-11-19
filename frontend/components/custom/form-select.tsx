import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type OptionsTypeProps = {
  label: string,
  value: any,
  icon?: React.FC,
  color?: string
}

type FormSelectProps<T extends FieldValues> = {
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  label?: string,
  options: OptionsTypeProps[],
  placeholder?: string,
  description?: string,
  disabled?: boolean | false,
  className?: string,
}

export function FormSelect<T extends FieldValues>(props: FormSelectProps<T>){
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Select disabled={props.disabled} onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((item: OptionsTypeProps) =>
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormDescription>
            {props.description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}