export interface IBill extends Document {
  salutation: string;
  name: string;
  address: string;
  phone: string;
}

export interface IItem extends Document {
  _id: string;
  vehicleNumber: string;
  date: string;
  from: string;
  to: string;
  lrNumber: string;
  units: number;
  rate: number;
  total: number;
  advance: number;
  detention: number;
  grandTotal: number;
}

export interface IInvoice extends Document {
  _id: string;
  invoiceId: number;
  invoiceStatus: string;
  date: string;
  billFrom: IBill;
  billTo: IBill;
  items: Array<IItem>;
  subTotal: number;
  gstPercentage: number;
  gstAmount: number;
  grandTotal: number;
  totalAdvanceAmount: number;
  note:string;
}
