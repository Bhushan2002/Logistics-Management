"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
} from "@/components/ui/form"
import { SignIn, signInSchema } from "../_data/schema"
import { FormInput } from "@/components/custom/form-input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

export function SignInForm(){

  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if(session.status === "authenticated") router.push("/dashboard")
  }, [session, router])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(values: SignIn) {
    setIsLoading(true)
    signIn("credentials", {
      ...values,
      redirect: true,
      callbackUrl: "/dashboard"
    })
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="Enter your email address"
        />
        <FormInput
          form={form}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember_me" />
            <Label>Remember me</Label>
          </div>
          <Link href="/" className={cn(buttonVariants({ variant: "link" }), "p-0 font-semibold")}>Forgot password?</Link>
        </div>
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  )
}