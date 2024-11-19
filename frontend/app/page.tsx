import { Card, CardContent } from '@/components/ui/card'
import { SignInForm } from './(auth)/_components/sign-in-form'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <section className="h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative flex justify-center items-center">
            <Image
              width={40}
              height={40}
              src="/logo.png"
              alt="Billing Software"
            />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <CardContent className="px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
