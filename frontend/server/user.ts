"use server";

import { AxiosError } from "axios";
import { get, put } from ".";

type PersonalDetails = {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    salutation: string;
    sign?: string;
  }
}

type CompanyDetails = {
  companyDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    panNumber: string;
    gstNumber: string;
    gstPercentage: number;
    companyLogo?: string;
  }
}

type User = PersonalDetails & CompanyDetails;

type RequestType = {
  success: boolean;
  message: string;
  data: User | null;
  error: AxiosError | null;
}

export async function getUser() {
  try {
    const user = await get<RequestType>("/user/details");
    return user;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateUser(data: PersonalDetails | CompanyDetails) {
  try {
    const user = await put<RequestType, PersonalDetails | CompanyDetails, User>("/user/details", data);
    return user;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}