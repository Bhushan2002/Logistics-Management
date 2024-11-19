import mongoose from "mongoose";
import { IUser } from "../interface/IUser";

const userSchema = new mongoose.Schema<IUser>(
  {
    personalDetails: {
      firstName: {
        type: String,
        required: [true, "First Name is required"],
      },
      lastName: {
        type: String,
        required: [true, "Last Name is required"],
      },
      phone: {
        type: String,
        required: [true, "PhoneNumber is required"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
      },
      salutation: {
        type: String,
        required: [true, "Salutation is required"],
      },
      sign: {
        type: String,
        required: [true, "Sign is required"],
      },
    },
    companyDetails: {
      name: {
        type: String,
        required: [true, "Company Name is required"],
      },
      email: {
        type: String,
        unique: true,
        required: [true, "Company Email is required"],
      },
      address: {
        type: String,
        required: [true, "Company Address is required"],
      },
      gstNumber: {
        type: String,
        required: [true, "GST Number is required"],
      },
      phone: {
        type: String,
        required: [true, "Phone is required"],
      },
      gstPercentage: {
        type: Number,
        default: 0,
      },
      panNumber: {
        type: String,
        required: [true, "GST Number is required"],
      },
      companyLogo: {
        type: String,
        required: [true, "Company Logo is required"],
      },
    },
    balanceSheet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BalanceSheet",
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema) || mongoose.models.User;

export default User;
