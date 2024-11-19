"use server";

import axios, { AxiosError } from "axios";
import { get, post, put, remove } from ".";
import { Customer } from "@/app/(application)/(routes)/customers/_data/schema";
import { User } from "@/app/(application)/(routes)/profile/_data/schema";
import { invoiceTemplate } from "@/utils/invoice-template.s";


const HTML_TO_PDF_SERVER_BASE_URL = "http://3.111.188.110:8090/pdf/account";

const salutations = ["mr", "mrs", "ms"] as const;
const statuses = ["PAID", "UNPAID"] as const;

type BillDetails = {
  _id?: string;
  salutation: typeof salutations[number];
  name: string;
  address: string;
  phone: string;
}

type ItemDetails = {
  _id?: string;
  id?: string;
  vehicleNumber: string;
  date: string;
  from: string;
  to: string;
  lrNumber: string;
  units: number;
  rate: number;
  total: number;
  detention: number;
  grandTotal: number;
  advance: number;
}

type InvoiceDetails = {
  _id?: string;
  invoiceId?: number;
  invoiceStatus: typeof statuses[number];
  date: string;
  billFrom: BillDetails;
  billTo: BillDetails;
  subTotal: number;
  gstPercentage: number;
  gstAmount: number;
  grandTotal: number;
  totalAdvanceAmount: number;
  items?: ItemDetails[];
  note?: string;
}

type CreateInvoice = {
  customerId: string;
} & InvoiceDetails;

type RemoveInvoice = {
  customerId: string;
  invoiceId: string;
}

type PrintInvoice = {
  user: User;
  invoice: InvoiceDetails;
}

type RequestType = {
  success: boolean;
  message: string;
  data: InvoiceDetails | null;
  error: AxiosError | null;
}

type RequestGetCustomerAllInvoicesType = {
  success: boolean;
  message: string;
  data: {
    invoices: InvoiceDetails[] | null;
  } | null;
  error: AxiosError | null;
}

type RequestGetUserAllInvoicesType = {
  success: boolean;
  message: string;
  data: {
    customers: Customer[] | null;
  } | null;
  error: AxiosError | null;
}

type RequestPrintInvoiceType = {
  success: boolean;
  message: string;
  data: {
    pdfUrl: string | null;
  } | null;
  error: AxiosError | null;
}


export async function createInvoice(body: CreateInvoice) {
  try {
    const invoice = await post<RequestType, CreateInvoice, CreateInvoice>("/invoice", body);
    console.log(invoice);
    return invoice;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getInvoice(id: string) {
  try {
    const invoice = await get<RequestType>("/invoice/details/" + id);
    return invoice;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getCustomerAllInvoices(id: string) {
  try {
    const invoice = await get<RequestGetCustomerAllInvoicesType>("/invoice/customer/" + id);
    return invoice;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getUserAllInvoices() {
  try {
    const invoice = await get<RequestGetUserAllInvoicesType>("/invoice");
    return invoice;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateInvoice(id: string, data: InvoiceDetails) {
  try {
    const invoice = await put<RequestType, InvoiceDetails, InvoiceDetails>("/invoice/details/" + id, data);
    return invoice;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function removeInvoice(body: RemoveInvoice) {
  try {
    const invoice = await post<RequestType, RemoveInvoice, RemoveInvoice>("/invoice/delete", body);
    return invoice;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function printInvoice(data: PrintInvoice) {
  try {
    const html = invoiceTemplate(data);
    const body = {
      html: html,
      s3Key: `${data.invoice.billTo.name}-${new Date().toLocaleTimeString()}.pdf`
    }
    console.log(body);
    console.log(HTML_TO_PDF_SERVER_BASE_URL)
    const response = await axios.post(HTML_TO_PDF_SERVER_BASE_URL, body)
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