"use server";

import axios, { AxiosError } from "axios";
import { get, post, put } from ".";
import { balanceSheetReportTemplate } from "@/utils/balance-sheet-report-template";
import { User } from "@/app/(application)/(routes)/profile/_data/schema";

const HTML_TO_PDF_SERVER_BASE_URL = "http://3.111.188.110:8090/pdf/account";

type BalanceSheetEntry = {
  title: string;
  accountName: string;
  amount: number;
  status: "CREDIT" | "DEBIT";
  date: string;
}

type BalanceSheet = {
  totalCreditedAmount: number;
  totalDebitedAmount: number;
  items: BalanceSheetEntry[];
}

type PrintBalanceSheetInDateRangeType = {
  from: string;
  to: string;
  user: User;
  totalCreditedAmount: number;
  totalDebitedAmount: number;
  items: BalanceSheetEntry[];
}


type RequestType = {
  success: boolean;
  message: string;
  data: BalanceSheet | null;
  error: AxiosError | null;
}

type GetBalanceSheetInDateRangeRequestType = {
  success: boolean;
  message: string;
  data: {
    user: User;
    totalCreditedAmount: number;
    totalDebitedAmount: number;
    items: BalanceSheetEntry[];
  }[];
  error: AxiosError | null;
}

export async function createBalanceSheet(data: {items: BalanceSheetEntry[]}) {
  try {
    const balandeSheet = await post<RequestType, {items: BalanceSheetEntry[]}, BalanceSheet>("/balance-sheet/create", data);
    return balandeSheet;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getBalanceSheet() {
  try {
    const balandeSheet = await get<RequestType>("/balance-sheet/details");
    return balandeSheet;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function addEntry(data: BalanceSheetEntry) {
  try {
    const balandeSheet = await put<RequestType, BalanceSheetEntry, BalanceSheet>("/balance-sheet/item/create", data);
    return balandeSheet;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateEntry(body: { itemId: string, item: BalanceSheetEntry }) {
  try {
    const balandeSheet = await put<RequestType, { itemId: string, item: BalanceSheetEntry }, BalanceSheet>("/balance-sheet/item/update", body);
    return balandeSheet;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function removeEntry(body: { itemId: string }) {
  try {
    const balandeSheet = await put<RequestType, { itemId: string }, BalanceSheet>("/balance-sheet/item/delete", body);
    return balandeSheet;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getBalanceSheetInDateRange(from: string, to: string) {
  try {
    const balandeSheet = await get<GetBalanceSheetInDateRangeRequestType>("/balance-sheet/reports/?from=" + from + "&to=" + to);
    return balandeSheet;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function printBalanceSheetInDateRange(data: PrintBalanceSheetInDateRangeType) {
  try {
    const html = balanceSheetReportTemplate(data);
    const body = {
      html: html,
      s3Key: `balance-sheet-report-${data.user.personalDetails.firstName}-${data.user.personalDetails.lastName}-${new Date().toLocaleTimeString()}.pdf`
    }
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL + "/", body)
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