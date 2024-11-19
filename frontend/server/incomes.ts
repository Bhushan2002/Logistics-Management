"use server";

import { AxiosError } from "axios";
import { get, post, put } from ".";
import { Trip } from "@/app/(application)/(routes)/trips/_data/schema";

type IncomeItem = {
  _id?: string;
  title: string;
  amount: number;
  date: string;
  mode: string;
}

type Income = {
  totalAmount: number;
  dueAmount: number;
  items: IncomeItem[];
}

type RequestType = {
  success: boolean;
  message: string;
  data: Trip | null;
  error: AxiosError | null;
}

type RequestGetIncomeType = {
  success: boolean;
  message: string;
  data: {
    incomeDetails: Income | null;
  } | null;
  error: AxiosError | null;
}

type RemoveItemType = {
  action: string;
  tripId: string;
  itemId: string;
}

export async function addIncome(id: string, data: { items: IncomeItem[] }) {
  try {
    const income = await put<RequestType, { items: IncomeItem[] }, { items: IncomeItem[] }>("/trip/income/" + id, data)
    return income;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateIncome(id: string, data: { items: IncomeItem[] }) {
  try {
    const income = await put<RequestType, { items: IncomeItem[] }, { items: IncomeItem[] }>("/trip/income/" + id, data)
    return income;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getTripIncome(id: string) {
  try {
    const income = await get<RequestGetIncomeType>("/trip/income/" + id)
    return income;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function removeIncome(body: RemoveItemType) {
  try {
    const income = await put<RequestType, RemoveItemType, RemoveItemType>("/trip/item/delete", body)
    return income;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}