import mongoose from "mongoose";
import {
  ITrip,
  IPrimary,
  IExpense,
  IIncome,
  IIncomeItem,
  IFinance,
  IDriver,
} from "../interface/ITrips";

const primarySchema = new mongoose.Schema<IPrimary>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  vehicleNumber: {
    type: String,
    required: [true, "VehicleNumber is required"],
  },
  from: {
    type: String,
    required: [true, "From location is required"],
  },
  to: {
    type: String,
    required: [true, "To location is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  lrNumber: {
    type: String,
    required: [true, "LR Number is required"],
  },
});

const financeSchema = new mongoose.Schema<IFinance>(
  {
    units: {
      type: Number,
      required: [true, "Units is required"],
    },
    rate: {
      type: Number,
      default: 0,
    },
    subTotalAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    isGST: {
      type: Boolean,
      default: false,
    },
    gstAmount: {
      type: Number,
      default: 0,
    },
    gstPercentage: {
      type: Number,
      default: 0,
    },
    advanceAmount: {
      type: Number,
      default: 0,
    },
    commissionAmount: {
      type: Number,
      default: 0,
    },
    tsdShortageAmount: {
      type: Number,
      default: 0,
    },
    courier: {
      type: String,
      required: [true, "Courier  is required"],
    },
  },
  { timestamps: true }
);

const driverSchema = new mongoose.Schema<IDriver>({
  salutation: {
    type: String,
    // required: [true, "Salutation  is required"],
  },
  firstName: {
    type: String,
    // required: [true, "FirstName  is required"],
  },
  lastName: {
    type: String,
    // required: [true, "LastName  is required"],
  },
  phone: {
    type: String,
  },
});

const incomeItemSchema = new mongoose.Schema<IIncomeItem>({
  title: {
    type: String,
    required: [true, "Item title  is required"],
  },
  amount: {
    type: Number,
    required: [true, "Item Amount  is required"],
  },
  date: {
    type: String,
    required: [true, "Item Date  is required"],
  },
  mode: {
    type: String,
    required: [true, "Item mode  is required"],
  },
});

const incomeSchema = new mongoose.Schema<IIncome>({
  totalAmount: {
    type: Number,
    default: 0,
  },
  dueAmount: {
    type: Number,
  },
  items: [incomeItemSchema],
});

const expenseSchema = new mongoose.Schema<IExpense>({
  totalAmount: {
    type: Number,
    default: 0,
  },
  items: [incomeItemSchema],
});

const tripSchema = new mongoose.Schema<ITrip>(
  {
    primaryDetails: primarySchema,
    financeDetails: financeSchema,
    driverDetails: driverSchema,
    incomeDetails: incomeSchema,
    expenseDetails: expenseSchema,
  },
  { timestamps: true }
);

const Trip = mongoose.model<ITrip>("Trip", tripSchema) || mongoose.models.Trip;

export default Trip;
