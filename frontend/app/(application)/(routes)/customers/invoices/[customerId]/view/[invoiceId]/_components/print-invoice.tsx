import { User } from "@/app/(application)/(routes)/profile/_data/schema"
import { InvoiceDetails } from "../../../_data/schema"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { printInvoice } from "@/server/invoices";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type PrintInvoiceProps = {
  user: User
  invoice: InvoiceDetails
}

export function PrintInvoice(props: PrintInvoiceProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  async function onPrint() {
    const data = {
      user: props.user,
      invoice: props.invoice
    }
    setIsLoading(true)
    const response = await printInvoice(data)
    setIsLoading(false)
    if(response?.success){
      window.open(response.data.pdfUrl ?? "", "_blank")?.focus()
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
  }

  return (
    <Button onClick={onPrint} className="bg-slate-900 hover:bg-slate-800" disabled={isLoading} type="button">
      <Printer className="w-4 h-4 mr-2" />
      Print
    </Button>
  )
}