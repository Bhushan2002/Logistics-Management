import mongoose from "mongoose";
import { ICustomer } from "../interface/ICustomer";
import { deflate } from "zlib";

const customerSchema = new mongoose.Schema<ICustomer>(
  {
    personalDetails: {
      type: {
        type: String,
        required: [true, "Customer type is required"],
      },
      salutation: {
        type: String,
        required: [true, "Salutation is required"],
      },
      firstName: {
        type: String,
        required: [true, "Customer firstName is required"],
      },
      lastName: {
        type: String,
        required: [true, "Customer lastName is required"],
      },
      phone: {
        type: String,
        required: [true, "Customer Phone is required"],
      },
      email: {
        type: String,
      },
    },
    companyDetails: {
      name: {
        type: String,
        required: [true, "Company Name is required"],
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      isGST: {
        type: Boolean,
        default: false,
      },
      gstNumber: {
        type: String,
      },
      panNumber: {
        type: String,
      },
    },
    trips: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Trip",
      },
    ],
    invoices: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Invoice",
      },
    ],
  },
  { timestamps: true },
);

const Customer =
  mongoose.model<ICustomer>("Customer", customerSchema) ||
  mongoose.models.Customer;

export default Customer;
