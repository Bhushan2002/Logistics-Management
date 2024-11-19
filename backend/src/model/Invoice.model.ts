import { trace } from "console";
import { IBill, IInvoice, IItem } from "../interface/IInvoice";
import mongoose, { Schema } from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc-fix";

const BillSchema = new Schema<IBill>({
  salutation: {
    type: String,
    required: [true, "Salutation is requrired"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
});

const ItemSchema = new Schema<IItem>({
  vehicleNumber: {
    type: String,
    required: [true, "VehicleNumber is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  from: {
    type: String,
    required: [true, "From location is required"],
  },
  to: {
    type: String,
    required: [true, "To location is required"],
  },
  lrNumber: {
    type: String,
    required: [true, "IrNumber is required"],
  },
  units: {
    type: Number,
    required: [true, "Units is required"],
  },
  rate: {
    type: Number,
    required: [true, "Rate is required"],
  },
  total: {
    type: Number,
    default: 0,
  },
  detention: {
    type: Number,
    default: 0,
  },
  grandTotal: {
    type: Number,
    default: 0,
  },
  advance: {
    type: Number,
    default: 0
  }
});

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceId: {
      type: Number,
    },
    invoiceStatus: {
      type: String,
      required: [true, "Invoice Status is required"],
    },
    date: {
      type: String,
      required: [true, "Invoice Date is required"],
    },
    billTo: BillSchema,
    billFrom: BillSchema,
    subTotal: {
      type: Number,
      default: 0,
    },
    gstPercentage: {
      type: Number,
      default: 0,
    },
    gstAmount: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      default: 0,
    },
    totalAdvanceAmount: {
      type: Number,
      default: 0,
    },
    items: [ItemSchema],
    note: {
      type: String
    }
  },
  { timestamps: true }
);




const Invoice =
  mongoose.model<IInvoice>("Invoice", InvoiceSchema) || mongoose.models.Invoice;


export default Invoice;
