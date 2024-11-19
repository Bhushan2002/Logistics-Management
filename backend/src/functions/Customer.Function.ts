import { ICustomer } from "../interface/ICustomer";
import { IInvoice } from "../interface/IInvoice";
import Customer from "../model/Customer.model";
import User from "../model/User.model";

export async function createCustomer(user: string, body: ICustomer) {
  const customerObj = await Customer.create(body);

  if (customerObj?._id) {
    await User.findByIdAndUpdate(user, {
      $push: {
        customers: customerObj._id,
      },
    });
  }

  return customerObj;
}

export async function getCustomerDetails(_id: string) {
  return await Customer.findById(_id);
}

export async function getCustomers(user: string) {
  return await User.findById(user).populate("customers");
}

export async function updateCustomer(_id: string, body: ICustomer) {
  return await Customer.findByIdAndUpdate(_id, body, { new: true });
}

export async function deleteCustomer(user: string, _id: string) {
  await User.findByIdAndUpdate(user, {
    $pull: {
      customers: _id,
    },
  });

  return await Customer.findByIdAndDelete(_id);
}
