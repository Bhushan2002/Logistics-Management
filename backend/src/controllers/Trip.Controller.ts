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
  createTrip,
  deleteTrip,
  deleteTripItemDetails,
  getExpenseDetails,
  getFinanceDetails,
  getIncomeDetails,
  getTripDashboard,
  getTripDetails,
  getTripItemDetails,
  getTrips,
  getUserAllTrips,
  updateTrip,
  updateTripDetails,
  updateTripExpenseDetails,
  updateTripIncomeDetails,
} from "../functions/Trip.Function";
import { getItemDetails } from "../functions/BalanceSheet.Function";

export const createTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await createTrip(req.body.customerId, req.body);
      await disconnectDatabase();

      return tripObj._id
        ? SuccssHandler(res, tripObj, "Trip created")
        : ErrorHandler(res, "Unable to create Trip");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const updateIncomeTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body;
      await connectDatabase();
      const tripObj = await updateTripIncomeDetails(req.params.id, body);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip income is updated")
        : ErrorHandler(res, "Unable to update income details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const updateExpenseTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body;
      await connectDatabase();
      const tripObj = await updateTripExpenseDetails(req.params.id, body);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip expense is updated")
        : ErrorHandler(res, "Unable to update expense details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const updateTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      const body = req.body;
      await connectDatabase();
      const tripObj = await updateTripDetails(req.params.id, body);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip details is updated")
        : ErrorHandler(res, "Unable to update trip details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getTripDetails(req.params.id);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip details found")
        : ErrorHandler(res, "Unable to find Trip details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getCustomerAllTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getTrips(req.params.id);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip for customer found")
        : ErrorHandler(res, "Unable to find customer Trip details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getUserTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getUserAllTrips(String(user?._id));
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Users all trips details found")
        : ErrorHandler(res, "Unable to find users Trips details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getSingleTripItemModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getTripItemDetails(
        req.body.action,
        req.body.tripId,
        req.body.itemId,
      );
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Item details found")
        : ErrorHandler(res, "Unable to find items details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
export const deleteSingleTripItemModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await deleteTripItemDetails(
        req.body.action,
        req.body.tripId,
        req.body.itemId,
      );
      await disconnectDatabase();

      return tripObj
        ? SuccssHandler(res, tripObj, "Item details deleted")
        : ErrorHandler(res, "Unable to delete items details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getIncomeTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getIncomeDetails(req.params.id);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip Income details found")
        : ErrorHandler(res, "Unable to find trip income details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
export const getFinanceTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getFinanceDetails(req.params.id);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip Finance details found")
        : ErrorHandler(res, "Unable to find trip finance details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
export const getExpenseTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getExpenseDetails(req.params.id);
      await disconnectDatabase();

      return tripObj?._id
        ? SuccssHandler(res, tripObj, "Trip Expense details found")
        : ErrorHandler(res, "Unable to find trip expense details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const deleteTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await deleteTrip(req.body.tripId, req.body.customerId);
      await disconnectDatabase();

      return tripObj
        ? SuccssHandler(res, tripObj, "Trip details deleted")
        : ErrorHandler(res, "Unable to delete trip details");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};

export const getCustomerRangeTripModel = async (req: IAuth, res: Response) => {
  try {
    const user = req.user as IUser;

    if (user?._id) {
      await connectDatabase();
      const tripObj = await getTripDashboard(
        String(user?._id),
        String(req.query.from),
        String(req.query.to),
      );

      await disconnectDatabase();
      return tripObj
        ? SuccssHandler(res, tripObj, "Trip details for dates")
        : ErrorHandler(res, "Unable to find trip details in range");
    }
    return InvalidUserHandler(res);
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
};
