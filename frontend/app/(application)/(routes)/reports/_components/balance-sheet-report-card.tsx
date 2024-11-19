"use client";

import { DatePickerWithRange } from "@/components/custom/date-picker-with-range";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  getBalanceSheetInDateRange,
  printBalanceSheetInDateRange,
} from "@/server/balance-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "../../profile/_data/schema";

const dateSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type Date = z.infer<typeof dateSchema>;

export function BalanceSheetReportCard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Date>({
    resolver: zodResolver(dateSchema),
  });
  async function onSubmit(values: Date) {
    const from = values.date.from.toISOString().split("T")[0];
    const to = values.date.to.toISOString().split("T")[0];
    setIsLoading(true);
    const response = await getBalanceSheetInDateRange(from, to);
    setIsLoading(false);
    if (response?.success) {
      const data = {
        from: from,
        to: to,
        user: response.data[0].user ?? {},
        totalCreditedAmount: response.data[0].totalCreditedAmount ?? 0,
        totalDebitedAmount: response.data[0].totalDebitedAmount ?? 0,
        items: response.data[0].items ?? [],
      };
      setIsLoading(true);
      const generateReportResponse = await printBalanceSheetInDateRange(data);
      setIsLoading(false);
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Balance Sheet Report</CardTitle>
        <CardDescription>Export the balance sheet report</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DatePickerWithRange
              form={form}
              name="date"
              label="Pick a date range"
              placeholder="Pick a date range"
            />
            <div className="flex justify-end">
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
