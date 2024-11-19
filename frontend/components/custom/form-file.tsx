"use client";

import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

type FormFileProps<T extends FieldValues> = {
  form: UseFormReturn<T>,
  name: FieldPath<T>,
  label?: string,
  placeholder?: string,
  description?: string,
  disabled?: boolean | false,
  className?: string,
}

export function FormFile<T extends FieldValues>(props: FormFileProps<T>){

  const { toast } = useToast()

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <div className="flex items-center space-x-4">
            <img
              src={field.value}
              alt="Company Logo"
              className="h-32 object-contain"
            />
            <FormControl>
              <UploadButton
                endpoint="imageUploader"
                className={props.disabled ? "pointer-events-none opacity-60 cursor-not-allowed" : ""}
                  onClientUploadComplete={(response) => {
                  const url = response[0].url as string
                  field.onChange(url)
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>
                  })
                }}
              />
            </FormControl>
          </div>
          <FormDescription>
            {props.description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}