"use client";

import { Customer } from "@/app/(application)/(routes)/customers/_data/schema";
import { User } from "@/app/(application)/(routes)/profile/_data/schema"
import { Trip } from "../../../../_data/schema";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { printTripReport } from "@/server/trips";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

type PrintTripReportProps = {
  user: User;
  customer: Customer;
  trip: Trip;
}

export function PrintTripReport(props: PrintTripReportProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast();

  async function onPrint() {
    const data = {
      user: props.user,
      customer: props.customer,
      trip: props.trip
    }
    setIsLoading(true)
    const generateReportResponse = await printTripReport(data)
    setIsLoading(false)
    if (generateReportResponse?.success) {
      window
        .open(generateReportResponse.data?.pdfUrl ?? "", "_blank")
        ?.focus();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <Button onClick={onPrint} disabled={isLoading}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      Print
    </Button>
  )
}

