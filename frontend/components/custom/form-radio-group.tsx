import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { cn } from "@/lib/utils"

type OptionsTypeProps = {
  label: string,
  value: any,
}

type FormRadioGroupProps<T extends FieldValues> = {
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  label: string,
  options: OptionsTypeProps[],
  placeholder?: string,
  description?: string,
  disabled?: boolean | false,
  className?: string,
}

export function FormRadioGroup<T extends FieldValues>(props: FormRadioGroupProps<T>){
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("space-y-4", props.className)}>
          <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
                disabled={props.disabled}
              >
                {props.options.map((option: OptionsTypeProps) => (
                  <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>              
            </FormControl>

          <FormDescription>
            {props.description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}