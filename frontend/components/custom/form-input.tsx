import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { HTMLInputTypeAttribute } from "react"
import { cn } from "@/lib/utils"

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  label?: string,
  placeholder?: string,
  description?: string,
  type?: HTMLInputTypeAttribute | "text",
  disabled?: boolean | false,
  className?: string,
}

export function FormInput<T extends FieldValues>(props: FormInputProps<T>){
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
              type={props.type}
              disabled={props.disabled}
              placeholder={props.placeholder}
              {...field}
              onChange={(event) => {
                if(props.type === "number"){
                  field.onChange(Number(event.target.value))
                } else {
                  field.onChange(event.target.value)
                }
              }}
            />
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