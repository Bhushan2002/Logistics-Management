import mongoose, { mongo } from "mongoose";
import { IIncomeItem, ITrip } from "../interface/ITrips";
import Customer from "../model/Customer.model";
import Trip from "../model/Trip.model";
import User from "../model/User.model";
import { getItemDetails } from "./BalanceSheet.Function";
import { warn } from "console";
import { resolveTripleslashReference } from "typescript";
import moment from "moment";

const amountCalculation = (items: IIncomeItem[]) => {
  return items.reduce((acc, curr: IIncomeItem) => acc + curr.amount, 0);
};

export async function createTrip(customerId: string, body: ITrip) {
  const tripObj = await Trip.create({
    primaryDetails: body.primaryDetails,
    financeDetails: body.financeDetails,
    driverDetails: body.driverDetails,
    incomeDetails: {
      ...body.incomeDetails,
      dueAmount: body.financeDetails?.dueAmount,
    },
    expenseDetails: body.expenseDetails,
  });

  if (tripObj?._id) {
    await Customer.findByIdAndUpdate(customerId, {
      $push: {
        trips: tripObj._id,
      },
    });
  }

  return tripObj;
}

export async function getTripDetails(_id: string) {
  return await Trip.findById(_id);
}

export async function getTrips(customerId: string) {
  return await Customer.findById(customerId).populate("trips");
}

export async function updateTrip(_id: string, body: ITrip) {
  return await Trip.findByIdAndUpdate(_id, body, { new: true });
}

export async function deleteTrip(_id: string, customerId: string) {
  await Customer.findByIdAndUpdate(customerId, {
    $pull: {
      trips: _id,
    },
  });

  return await Trip.findByIdAndDelete(_id);
}

export async function getUserAllTrips(user: string) {
  return await User.findById(user).populate({
    path: "customers",
    model: "Customer",
    populate: {
      path: "trips",
      model: "Trip",
    },
  });
}

export async function getTripItemDetails(
  action: string,
  tripId: string,
  itemId: string
) {
  if (action === "INCOME") {
    const itemObj = await Trip.findOne({
      _id: new mongoose.Types.ObjectId(tripId),
      "incomeDetails.items": {
        $elemMatch: { _id: new mongoose.Types.ObjectId(itemId) },
      },
    });
    const itemDetails = itemObj?.incomeDetails?.items.find(
      (item: IIncomeItem) => item._id == itemId
    );
    return itemDetails;
  } else if (action === "EXPENSE") {
    const itemObj = await Trip.findOne({
      _id: new mongoose.Types.ObjectId(tripId),
      "expenseDetails.items._id": new mongoose.Types.ObjectId(itemId),
    }).select("expenseDetails.items");

    const itemDetails = itemObj?.expenseDetails?.items.find(
      (item: IIncomeItem) => item._id == itemId
    );

    return itemDetails;
  }
}

export async function deleteTripItemDetails(
  action: string,
  tripId: string,
  itemId: string
) {
  const itemDetails = await getTripItemDetails(action, tripId, itemId);
  if (action === "INCOME" && itemDetails?._id) {
    return await Trip.findByIdAndUpdate(tripId, {
      $pull: {
        "incomeDetails.items": {
          _id: new mongoose.Types.ObjectId(itemId),
        },
      },
      $inc: {
        "incomeDetails.totalAmount": -itemDetails?.amount || 0,
        "incomeDetails.dueAmount": itemDetails?.amount || 0,
      },
    });
  } else if (action === "EXPENSE" && itemDetails?._id) {
    return await Trip.findByIdAndUpdate(tripId, {
      $inc: {
        "expenseDetails.totalAmount": -itemDetails?.amount || 0,
      },
      $pull: {
        "expenseDetails.items": {
          _id: new mongoose.Types.ObjectId(itemId),
        },
      },
    });
  }
}

export async function updateTripIncomeDetails(
  tripId: string,
  body: { items: IIncomeItem[] }
) {
  if (body.items[0]._id) {
    let itemId = body.items[0]?._id;
    const itemDetails = await getTripItemDetails(
      "INCOME",
      tripId,
      body?.items[0]?._id
    );
    return await Trip.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(tripId),
        "incomeDetails.items": {
          $elemMatch: { _id: new mongoose.Types.ObjectId(itemId) },
        },
      },
      {
        $set: {
          "incomeDetails.items.$": body.items[0],
        },
        $inc: {
          "incomeDetails.totalAmount":
            body.items[0]?.amount - (itemDetails?.amount || 0) || 0,
          "incomeDetails.dueAmount":
            -(body.items[0]?.amount - (itemDetails?.amount || 0)) || 0,
        },
      }
    );
  }
  return await Trip.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(tripId),
    },
    {
      $push: {
        "incomeDetails.items": body.items[0],
      },
      $inc: {
        "incomeDetails.totalAmount": body.items[0]?.amount || 0,
        "incomeDetails.dueAmount": -body.items[0]?.amount || 0,
      },
    }
  );
}

export async function updateTripExpenseDetails(
  tripId: string,
  body: { items: IIncomeItem[] }
) {
  if (body.items[0]?._id) {
    let itemId = body.items[0]?._id;
    const itemDetails = await getTripItemDetails(
      "EXPENSE",
      tripId,
      body?.items[0]?._id
    );
    return await Trip.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(tripId),
        "expenseDetails.items": {
          $elemMatch: { _id: new mongoose.Types.ObjectId(itemId) },
        },
      },
      {
        $set: {
          "expenseDetails.items.$": body.items[0],
        },
        $inc: {
          "expenseDetails.totalAmount":
            body.items[0]?.amount - (itemDetails?.amount || 0) || 0,
        },
      }
    );
  }
  return await Trip.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(tripId),
    },
    {
      $push: {
        "expenseDetails.items": body.items[0],
      },
      $inc: {
        "expenseDetails.totalAmount": body.items[0]?.amount || 0,
      },
    }
  );
}

export async function updateTripDetails(tripId: string, body: ITrip) {
  const tripObj = await Trip.findByIdAndUpdate(tripId, body, { new: true });
  if (body.financeDetails?.dueAmount) {
    const tripObj = await Trip.findById(tripId).select("incomeDetails");
    if (tripObj?._id) {
      const nDueAmount =
        body.financeDetails?.dueAmount - tripObj.incomeDetails?.totalAmount;
      await Trip.findByIdAndUpdate(tripId, {
        $set: {
          "incomeDetails.dueAmount": nDueAmount,
        },
      });
    }
  }
  return tripObj;
}

export async function getFinanceDetails(tripId: string) {
  return await Trip.findById(tripId).select("financeDetails");
}

export async function getIncomeDetails(tripId: string) {
  return await Trip.findById(tripId).select("incomeDetails");
}

export async function getExpenseDetails(tripId: string) {
  return await Trip.findById(tripId).select("expenseDetails");
}

export async function getTripDashboard(
  userId: string,
  from: string,
  to: string
) {
  return await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customers",
        foreignField: "_id",
        as: "customers",
      },
    },
    {
      $unwind: "$customers",
    },
    {
      $lookup: {
        from: "trips",
        localField: "customers.trips",
        foreignField: "_id",
        as: "trips",
      },
    },
    {
      $unwind: "$trips",
    },
    {
      $match: {
        "trips.primaryDetails.date": {
          $gte: moment(from).format("YYYY-MM-DD"),
          $lte: moment(to).format("YYYY-MM-DD"),
        },
      },
    },
    {
      $group: {
        _id: "$customers._id",
        personalDetails: { $first: "$customers.personalDetails" },
        companyDetails: { $first: "$customers.companyDetails" },
        trips: { $push: "$trips" },
      },
    },
  ]);
}
