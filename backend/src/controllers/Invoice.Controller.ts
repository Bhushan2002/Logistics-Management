import { Request, Response } from "express";
import { IAuth } from "../interface/IAuth";
import { IUser } from "../interface/IUser";
import {
  ErrorHandler,
  InvalidUserHandler,
  ServerErrorHandler,
  SuccssHandler,
} from "../handlers/Request";
import { connectDatabase, disconnectDatabase } from "../config/Mongo";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoicesForCustomer,
  getUserInvoiceDetail,
  updateInvoiceDetail,
} from "../functions/Invoice.Function";

export const createInvoiceModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const invoiceObj = await createInvoice(req.body.customerId, req.body);
      await disconnectDatabase();

      return invoiceObj
        ? SuccssHandler(res, invoiceObj, "Invoice created successfully")
        : ErrorHandler(res, "Unable to create Invoice");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getInvoiceModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const invoiceObj = await getInvoice(req.params.id);
      await disconnectDatabase();

      return invoiceObj?._id
        ? SuccssHandler(res, invoiceObj, "Invoice details found")
        : ErrorHandler(res, "Unable to find invoice details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getUserInvoicesModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const invoiceObj = await getUserInvoiceDetail(String(user._id));
      await disconnectDatabase();

      return invoiceObj?._id
        ? SuccssHandler(res, invoiceObj, "User invoice details found")
        : ErrorHandler(res, "Unable to find user invoice details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getCustomerInvoiceModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const invoiceObj = await getInvoicesForCustomer(req.params.id);
      await disconnectDatabase();

      return invoiceObj?._id
        ? SuccssHandler(res, invoiceObj, "Invoices for customer found")
        : ErrorHandler(res, "Unable to find invoice for customer details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const updateInvoiceModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const invoiceObj = await updateInvoiceDetail(req.params.id, req.body);
      await disconnectDatabase();

      return invoiceObj?._id
        ? SuccssHandler(res, invoiceObj, "Invoice details updated successfully")
        : ErrorHandler(res, "Unable to update invoice details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const deleteInvoiceModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const invoiceObj = await deleteInvoice(
        req.body.customerId,
        req.body.invoiceId,
      );
      await disconnectDatabase();

      return invoiceObj?._id
        ? SuccssHandler(res, invoiceObj, "Invoice details deleted successfully")
        : ErrorHandler(res, "Unable to delete invoice details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
