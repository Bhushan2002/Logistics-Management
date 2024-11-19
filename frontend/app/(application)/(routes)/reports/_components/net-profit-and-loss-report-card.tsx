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
import { getTripsInRange, printNetProfitAndLossInDateRange, printTripsInDateRange } from "@/server/trips";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Customer } from "../../customers/_data/schema";
import { CustomerWithTrip } from "../../trips/_data/schema";
import { getUser } from "@/server/user";
import { User } from "../../profile/_data/schema";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const dateSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type Date = z.infer<typeof dateSchema>;

function manipulateTripsData(customers: Customer[]) {
  const trips = [] as CustomerWithTrip[];
  customers.forEach((customer) => {
    customer.trips?.map((trip) => {
      trips.push({
        customer: {
          _id: customer._id,
          personalDetails: customer.personalDetails,
          companyDetails: customer.companyDetails,
        },
        trip: trip,
      } as CustomerWithTrip);
    });
  });
  return trips as CustomerWithTrip[];
}

export function NetProfitAndLossReportCard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Date>({
    resolver: zodResolver(dateSchema),
  });

  async function onSubmit(values: Date) {
    const from = values.date.from.toISOString().split("T")[0];
    const to = values.date.to.toISOString().split("T")[0];
    setIsLoading(true);
    const response = await getTripsInRange(from, to);
    setIsLoading(false);
    if (response?.success) {
      if (response?.data?.length ?? 0 > 0) {
        const trips = manipulateTripsData(response.data as Customer[]);
        setIsLoading(true);
        const user = await getUser();
        setIsLoading(false);
        if (user?.success) {
          const totalIncome = trips.reduce((acc, trip) => {
            return acc + trip.trip.financeDetails.totalAmount;
          }, 0);
          const totalExpense = trips.reduce((acc, trip) => {
            return acc + (trip.trip.expenseDetails?.totalAmount ?? 0);
          }, 0);
          const body = {
            from: from,
            to: to,
            trips: trips,
            user: user.data as User,
            totalIncome: totalIncome,
            totalExpense: totalExpense,
          };
          setIsLoading(true);
          const generateReportResponse = await printNetProfitAndLossInDateRange(body);
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
        <CardTitle className="text-xl">Net P&L Report</CardTitle>
        <CardDescription>Export the net profit and loss report</CardDescription>
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
