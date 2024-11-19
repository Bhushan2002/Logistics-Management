import { Request, Response } from "express";
import { IAuth } from "../interface/IAuth";
import {
  ErrorHandler,
  InvalidUserHandler,
  ServerErrorHandler,
  SuccssHandler,
} from "../handlers/Request";
import { connectDatabase, disconnectDatabase } from "../config/Mongo";
import {
  createBalanceSheet,
  deleteItem,
  getAllUserBalanceSheet,
  getBalanceSheet,
  getBalanceSheetDashboard,
  insertItems,
  updateItem,
} from "../functions/BalanceSheet.Function";
import { IBalanceSheet } from "../interface/IBalanceSheet";
import { IUser } from "../interface/IUser";

export const createBalanceSheetModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;

    if (user?._id) {
      const body = req.body as IBalanceSheet;
      await connectDatabase();
      const balanceSheetObj = await createBalanceSheet(user?._id, body);
      await disconnectDatabase();

      return balanceSheetObj._id
        ? SuccssHandler(
            res,
            balanceSheetObj,
            "BalanceSheet is created succssfully",
          )
        : ErrorHandler(res, "Unable to create balancesheet");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
export const getBalanceSheetModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();

      const balanceSheetObj = await getBalanceSheet(String(user?.balanceSheet));

      await disconnectDatabase();

      return balanceSheetObj?._id
        ? SuccssHandler(res, balanceSheetObj, "BalanceSheet is Details")
        : ErrorHandler(res, "Unable to get balancesheet Details");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
export const getUserBalanceSheetModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;

    if (user?._id) {
      await connectDatabase();

      const balanceSheetObj = await getAllUserBalanceSheet(user?._id);

      await disconnectDatabase();

      return balanceSheetObj
        ? SuccssHandler(res, balanceSheetObj, "BalanceSheet is Details")
        : ErrorHandler(res, "Unable to get balancesheet Details");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getDashboardBalanceSheetModel = async (
  req: IAuth,
  res: Response,
) => {
  try {
    const { user } = req;

    if (user?._id) {
      await connectDatabase();
      const balanceSheetObj = await getBalanceSheetDashboard(
        String(user?._id),
        String(req.query.from),
        String(req.query.to),
      );
      await disconnectDatabase();

      return balanceSheetObj
        ? SuccssHandler(
            res,
            balanceSheetObj,
            "BalanceSheet is Details between date range",
          )
        : ErrorHandler(
            res,
            "Unable to get balancesheet Details between ranges",
          );
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const updateBalanceSheetItemModel = async (
  req: IAuth,
  res: Response,
) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body;
      await connectDatabase();

      const balanceSheetObj = await updateItem(
        String(user?.balanceSheet),
        body.itemId,
        body.item,
      );

      await disconnectDatabase();

      return balanceSheetObj?._id
        ? SuccssHandler(
            res,
            balanceSheetObj,
            "BalanceSheet is updated succssfully",
          )
        : ErrorHandler(res, "Unable to update balancesheet");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const insertBalanceSheetItemModel = async (
  req: IAuth,
  res: Response,
) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body;
      await connectDatabase();

      const balanceSheetObj = await insertItems(
        String(user?.balanceSheet),
        body,
      );

      await disconnectDatabase();

      return balanceSheetObj?._id
        ? SuccssHandler(
            res,
            balanceSheetObj,
            "New item is added in BalanceSheet",
          )
        : ErrorHandler(res, "Unable to insert item in balancesheet");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
export const deleteBalanceSheetItemModel = async (
  req: IAuth,
  res: Response,
) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body;
      await connectDatabase();

      const balanceSheetObj = await deleteItem(
        String(user?.balanceSheet),
        body.itemId,
      );

      await disconnectDatabase();

      return balanceSheetObj?._id
        ? SuccssHandler(
            res,
            balanceSheetObj,
            "BalanceSheet item is deleted successfully",
          )
        : ErrorHandler(res, "Unable to delete item balancesheet");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
