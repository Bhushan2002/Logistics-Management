"use server";

import axios, { AxiosError } from "axios";
import { get, post, put } from ".";
import { Customer } from "@/app/(application)/(routes)/customers/_data/schema";
import { tripsReportTemplate } from "@/utils/trips-report-template";
import { User } from "@/app/(application)/(routes)/profile/_data/schema";
import { netProfitAndLossReportTemplate } from "@/utils/net-profit-and-loss-template";
import { incomeReportTemplate } from "@/utils/income-report-template";
import { expenseReportTemplate } from "@/utils/expense-report-template";
import { tripReportTemplate } from "@/utils/trip-report-template";

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;
const salutations = ["mr", "mrs", "ms"] as const;

const HTML_TO_PDF_SERVER_BASE_URL = "http://3.111.188.110:8090/pdf/account";

type PrimaryDetailsTrip = {
  primaryDetails: {
    title: string;
    vehicleNumber: string;
    from: string;
    to: string;
    status: typeof statuses[number];
    date: string;
    lrNumber?: string;
  };
}

type FinanceDetailsTrip = {
  financeDetails: {
    units: number;
    rate: number;
    subTotalAmount: number;
    isGST: boolean;
    gstAmount: number;
    gstPercentage?: number;
    totalAmount: number;
    advanceAmount: number;
    commissionAmount: number;
    tsdShortageAmount: number;
    dueAmount: number;
    courier: string;
  }
}

type DriverDetailsTrip = {
  driverDetails: {
    salutation: typeof salutations[number];
    firstName: string;
    lastName: string;
    phone?: string;
  }
}

type Trip = {
  customerId?: string;
  _id?: string;
} & PrimaryDetailsTrip & FinanceDetailsTrip & DriverDetailsTrip;

type RequestType = {
  success: boolean;
  message: string;
  data: Trip | null;
  error: AxiosError | null;
}

type RequestUserAllTripsType = {
  success: boolean;
  message: string;
  data: {
    customers: Customer[] | null;
  } | null
  error: AxiosError | null;
}

type RequestCustomerAllTripsType = {
  success: boolean;
  message: string;
  data: {
    trips: Trip[] | null;
  } | null
  error: AxiosError | null;
}

type RemoveTripType = {
  tripId: string;
  customerId: string;
}
type GetTripsInRangeType = {
  success: boolean;
  message: string;
  data: Customer[]  | null;
  error: AxiosError | null;
}

type PrintTripsInDateRange = {
  from: string;
  to: string;
  user: User;
  trips: {
    customer: Customer;
    trip: Trip;
  }[],
}

type PrintNetProfitAndLossInDateRangeProps = {
  from: string;
  to: string;
  user: User;
  trips: {
    customer: Customer;
    trip: Trip;
  }[],
  totalIncome: number;
  totalExpense: number;
}

type PrintIncomeInDateRangeProps = {
  from: string;
  to: string;
  user: User;
  trips: {
    customer: Customer;
    trip: Trip;
  }[],
  totalIncome: number;
}

type PrintExpenseInDateRangeProps = {
  from: string;
  to: string;
  user: User;
  trips: {
    customer: Customer;
    trip: Trip;
  }[],
  totalExpense: number;
}

type PrintTripReportProps = {
  user: User;
  customer: Customer;
  trip: Trip;
}

export async function createTrip(data: Trip) {
  try {
    const trip = await post<RequestType, Trip, Trip>(`/trip`, data);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getUserAllTrips() {
  try {
    const trip = await get<RequestUserAllTripsType>(`/trip`);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getCustomerAllTrips(id: string) {
  try {
    const trip = await get<RequestCustomerAllTripsType>(`/trip/customer/` + id);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getTripDetails(id: string) {
  try {
    const trip = await get<RequestType>(`/trip/details/` + id);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateTripDetails(id: string, data: PrimaryDetailsTrip | FinanceDetailsTrip | DriverDetailsTrip) {
  try {
    const trip = await put<RequestType, PrimaryDetailsTrip | FinanceDetailsTrip | DriverDetailsTrip, PrimaryDetailsTrip | FinanceDetailsTrip | DriverDetailsTrip>(`/trip/details/` + id, data);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function removeTrip(body: RemoveTripType) {
  try {
    const trip = await post<RequestType, RemoveTripType, RemoveTripType>(`/trip/delete`, body);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getTripsInRange(from: string, to: string) {
  try {
    const trip = await get<GetTripsInRangeType>(`/trip/reports?from=${from}&to=${to}`);
    return trip;
  }
  catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function printTripsInDateRange(data: PrintTripsInDateRange) {
  try {
    const html = tripsReportTemplate(data);
    const body = {
      html: html,
      s3Key: `trips-report-${data.user.personalDetails.firstName}-${data.user.personalDetails.lastName}-${new Date().toLocaleTimeString()}.pdf`
    }
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL , body)
    return ({
      success: true,
      error: null,
      data: response.data,
      message: "Success"
    })
  } catch (error) {
    return ({
      success: false,
      error: error,
      data: null,
      message: "Something went wrong!"
    })
  }
}

export async function printTripReport(data: PrintTripReportProps) {
  try {
    const html = tripReportTemplate(data);
    const body = {
      html: html,
      s3Key: `trip-report-${data.user.personalDetails.firstName}-${data.user.personalDetails.lastName}-${new Date().toLocaleTimeString()}.pdf`
    }
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL , body)
    return ({
      success: true,
      error: null,
      data: response.data,
      message: "Success"
    })
  } catch (error) {
    return ({
      success: false,
      error: error,
      data: null,
      message: "Something went wrong!"
    })
  }
}

export async function printNetProfitAndLossInDateRange(data: PrintNetProfitAndLossInDateRangeProps) {
  try {
    const html = netProfitAndLossReportTemplate(data);
    const body = {
      html: html,
      s3Key: `net-profit-and-loss-report-${data.user.personalDetails.firstName}-${data.user.personalDetails.lastName}-${new Date().toLocaleTimeString()}.pdf`
    }
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL , body)
    return ({
      success: true,
      error: null,
      data: response.data,
      message: "Success"
    })
  } catch (error) {
    return ({
      success: false,
      error: error,
      data: null,
      message: "Something went wrong!"
    })
  }
}

export async function printIncomeInDateRange(data: PrintIncomeInDateRangeProps) {
  try {
    const html = incomeReportTemplate(data);
    const body = {
      html: html,
      s3Key: `income-report-${data.user.personalDetails.firstName}-${data.user.personalDetails.lastName}-${new Date().toLocaleTimeString()}.pdf`
    }
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL , body)
    return ({
      success: true,
      error: null,
      data: response.data,
      message: "Success"
    })
  } catch (error) {
    return ({
      success: false,
      error: error,
      data: null,
      message: "Something went wrong!"
    })
  }
}

export async function printExpenseInDateRange(data: PrintExpenseInDateRangeProps) {
  try {
    const html = expenseReportTemplate(data);
    const body = {
      html: html,
      s3Key: `expense-report-${data.user.personalDetails.firstName}-${data.user.personalDetails.lastName}-${new Date().toLocaleTimeString()}.pdf`
    }
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL , body)
    return ({
      success: true,
      error: null,
      data: response.data,
      message: "Success"
    })
  } catch (error) {
    return ({
      success: false,
      error: error,
      data: null,
      message: "Something went wrong!"
    })
  }
}