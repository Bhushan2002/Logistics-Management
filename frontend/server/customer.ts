"use server";

import { AxiosError } from "axios";
import { get, post, put, remove } from ".";

const types = ["individual", "company"] as const;
const salutations = ["mr", "mrs", "ms"] as const;

type CustomerPersonalDetails = {
  personalDetails: {
    type: typeof types[number];
    salutation: typeof salutations[number];
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
  }
}

type CustomerCompanyDetails = {
  companyDetails: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    panNumber?: string;
    gstNumber?: string;
    isGST: boolean;
  }
}

type Customer = CustomerPersonalDetails & CustomerCompanyDetails;

type RequestType = {
  success: boolean;
  message: string;
  data: Customer | null;
  error: AxiosError | null;
}

type GetAllCustomersRequestType = {
  success: boolean;
  message: string;
  data: {
    customers: Customer[] | null;
  } | null
  error: AxiosError | null;
}

export async function createCustomer(data: Customer) {
  try {
    const customer = await post<RequestType, Customer, Customer>("/customer", data);
    return customer;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getAllCustomers() {
  try {
    const customer = await get<GetAllCustomersRequestType>("/customer");
    return customer;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getCustomerDetails(id: string) {
  try {
    const customer = await get<RequestType>("/customer/details/" + id);
    return customer;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateCustomerDetails(id: string, data: CustomerPersonalDetails | CustomerCompanyDetails) {
  try {
    const customer = await put<RequestType, CustomerPersonalDetails | CustomerCompanyDetails, Customer>("/customer/details/" + id, data);
    return customer;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function removeCustomer(id: string) {
  try {
    const customer = await remove<RequestType>("/customer/details/" + id);
    return customer;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}