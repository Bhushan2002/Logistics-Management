import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"

type FormTextareaProps<T extends FieldValues> = {
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  label?: string,
  placeholder?: string,
  description?: string,
  type?: string | "text",
  disabled?: boolean | false,
  className?: string,
}

export function FormTextarea<T extends FieldValues>(props: FormTextareaProps<T>){
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Textarea
              rows={4}
              placeholder={props.placeholder}
              disabled={props.disabled}
              className="resize-none"
              {...field}
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