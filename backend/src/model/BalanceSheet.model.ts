import mongoose from "mongoose";
import { IBalanceSheet, IBalanceSheetItems } from "../interface/IBalanceSheet";
import { trace } from "console";

const itemsSchema = new mongoose.Schema<IBalanceSheetItems>({
  title: {
    type: String,
    required: [true, "Item title is required"],
  },
  accountName: {
    type: String,
    required: [true, "Account Name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Item ammount is required"],
  },
  status: {
    type: String,
    required: [true, "Item status is required"],
    enum: ["CREDIT", "DEBIT"],
  },
  date: {
    type: String,
    required: [true, "Item date is required"],
  },
});

const balanceSheetSchema = new mongoose.Schema<IBalanceSheet>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalCreditedAmount: {
      type: Number,
      default: 0,
    },
    totalDebitedAmount: {
      type: Number,
      default: 0,
    },
    items: [itemsSchema],
  },
  { timestamps: true },
);

const BalanceSheet =
  mongoose.model<IBalanceSheet>("BalanceSheet", balanceSheetSchema) ||
  mongoose.models.BalanceSheet;

export default BalanceSheet;
