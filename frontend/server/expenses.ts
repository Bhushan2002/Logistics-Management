"use server";

import { AxiosError } from "axios";
import { get, post, put, remove } from ".";
import { Trip } from "@/app/(application)/(routes)/trips/_data/schema";

type ExpenseItem = {
  _id?: string;
  title: string;
  amount: number;
  date: string;
  mode: string;
}

type Expense = {
  totalAmount: number;
  items: ExpenseItem[];
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
    expenseDetails: Expense | null;
  } | null;
  error: AxiosError | null;
}

type RemoveItemType = {
  action: string;
  tripId: string;
  itemId: string;
}

export async function addExpense(id: string, data: { items: ExpenseItem[] }) {
  try {
    const expense = await put<RequestType, { items: ExpenseItem[] }, { items: ExpenseItem[] }>("/trip/expense/" + id, data)
    return expense;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function updateExpense(id: string, data: { items: ExpenseItem[] }) {
  try {
    const expense = await put<RequestType, { items: ExpenseItem[] }, { items: ExpenseItem[] }>("/trip/expense/" + id, data)
    return expense;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function getTripExpense(id: string) {
  try {
    const expense = await get<RequestGetIncomeType>("/trip/expense/" + id)
    return expense;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}

export async function removeExpense(body: RemoveItemType) {
  try {
    const expense = await put<RequestType, RemoveItemType, RemoveItemType>("/trip/item/delete", body)
    return expense;
  } catch (error) {
    console.error('API Request Error:', error);
  }
}