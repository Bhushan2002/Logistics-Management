import { Request, Response } from "express";
import {
  ErrorHandler,
  InvalidUserHandler,
  ServerErrorHandler,
  SuccssHandler,
} from "../handlers/Request";
import { IAuth } from "../interface/IAuth";
import { IUser } from "../interface/IUser";
import {
  createCustomer,
  deleteCustomer,
  getCustomerDetails,
  getCustomers,
  updateCustomer,
} from "../functions/Customer.Function";
import { connectDatabase, disconnectDatabase } from "../config/Mongo";
import { disconnect } from "process";
import { ICustomer } from "../interface/ICustomer";

export const createCustomerModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const customerObj = await createCustomer(String(user?._id), req.body);
      await disconnectDatabase();
      return customerObj._id
        ? SuccssHandler(res, customerObj, "Customer created")
        : ErrorHandler(res, "Unable to create customer");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getCustomerModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const customerObj = await getCustomerDetails(String(req.params.id));
      await disconnectDatabase();
      return customerObj?._id
        ? SuccssHandler(res, customerObj, "Customer details found")
        : ErrorHandler(res, "Unable to find customer details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getAllCustomerModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const customerObj = await getCustomers(String(user?._id));
      await disconnectDatabase();
      return customerObj?._id
        ? SuccssHandler(res, customerObj, "User all customer details found")
        : ErrorHandler(res, "Unable to find user customers details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const updateCustomerModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body as ICustomer;
      await connectDatabase();
      const customerObj = await updateCustomer(req.params.id, body);
      await disconnectDatabase();
      return customerObj?._id
        ? SuccssHandler(res, customerObj, "Customer details updated")
        : ErrorHandler(res, "Unable to update customer details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const deleteCustomerModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const customerObj = await deleteCustomer(
        String(user?._id),
        req.params.id,
      );
      await disconnectDatabase();
      return customerObj?._id
        ? SuccssHandler(res, customerObj, "Customer details deleted")
        : ErrorHandler(res, "Unable to delete customer details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
