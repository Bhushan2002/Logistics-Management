import mongoose, { Document } from "mongoose";

export interface ICustomerPersonalDetails {
  type: string;
  salutation: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ICustomerCompanyDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  isGST: boolean;
  gstNumber: string;
  panNumber: string;
}

export interface ICustomer extends Document {
  _id: mongoose.Types.ObjectId;
  personalDetails: ICustomerPersonalDetails;
  companyDetails: ICustomerCompanyDetails;
  trips: mongoose.Types.ObjectId[];
  invoices: mongoose.Types.ObjectId[];
}
