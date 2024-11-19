import mongoose from "mongoose";

export interface IBalanceSheetItems extends Document {
  title: string;
  accountName: string;
  amount: number;
  status: string;
  date: string;
}

export interface IBalanceSheet extends Document {
  _id: string;
  totalCreditedAmount: number;
  totalDebitedAmount: number;
  items: IBalanceSheetItems[];
  user: mongoose.Types.ObjectId;
}
