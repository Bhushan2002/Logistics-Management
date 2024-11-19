import mongoose, { Document } from "mongoose";

export interface IPersonalDetails {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  salutation: string;
  sign: string;
}

export interface ICompanyDetails {
  name: string;
  email: string;
  address: string;
  phone: string;
  gstNumber: number;
  gstPercentage: number;
  panNumber: string;
  logo: string;
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  personalDetails: IPersonalDetails;
  companyDetails: ICompanyDetails;
  balanceSheet: mongoose.Types.ObjectId;
  customers: mongoose.Types.ObjectId[];
}
