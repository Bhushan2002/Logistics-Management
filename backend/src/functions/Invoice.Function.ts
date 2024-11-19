import { warn } from "console";
import { IInvoice } from "../interface/IInvoice";
import Invoice from "../model/Invoice.model";
import Customer from "../model/Customer.model";
import { getCustomerDetails } from "./Customer.Function";
import User from "../model/User.model";


export async function createInvoice(
  customer: string,
  body: IInvoice
) {
  const invoiceObj = await Invoice.create(body);

  await Customer.findByIdAndUpdate(customer, {
    $push: {
      invoices: invoiceObj._id,
    },
  });

  return invoiceObj;
}

export async function getInvoicesForCustomer(customer: string) {
  return await Customer.findById(customer).populate("invoices");
}

export async function getInvoice(id: string) {
  return await Invoice.findById(id);
}

export async function updateInvoiceDetail(id: string, body: IInvoice) {
  return await Invoice.findByIdAndUpdate(id, body, { new: true });
}

export async function getUserInvoiceDetail(id: string) {
  return await User.findById(id).populate({
    path: "customers",
    model: "Customer",
    populate: {
      path: "invoices",
      model: "Invoice",
    },
  });
}

export async function deleteInvoice(customer: string, id: string) {
  await Customer.findByIdAndUpdate(customer, {
    $pull: {
      invoices: id,
    },
  });
  return await Invoice.findByIdAndDelete(id);
}
