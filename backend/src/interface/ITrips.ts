import mongoose, { Document } from "mongoose";

export interface IPrimary extends Document {
  title: string;
  vehicleNumber: string;
  from: string;
  to: string;
  status: string;
  date: string;
  lrNumber: string;
}

export interface IFinance extends Document {
  units: number;
  rate: number;
  subTotalAmount: number;
  totalAmount: number;
  dueAmount: number;
  isGST: boolean;
  gstPercentage: number;
  gstAmount: number;
  advanceAmount: number;
  commissionAmount: number;
  tsdShortageAmount: number;
  courier: string;
}

export interface IDriver extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  salutation: string;
}

export interface IIncomeItem extends Document {
  title: string;
  amount: number;
  date: string;
  mode: string;
}

export interface IIncome extends Document {
  totalAmount: number;
  dueAmount: number;
  items: IIncomeItem[];
}

export interface IExpense extends Document {
  totalAmount: number;
  items: IIncomeItem[];
}

export interface ITrip extends Document {
  _id: mongoose.Types.ObjectId;
  primaryDetails: IPrimary;
  financeDetails: IFinance;
  driverDetails: IDriver;
  incomeDetails: IIncome;
  expenseDetails: IExpense;
}
