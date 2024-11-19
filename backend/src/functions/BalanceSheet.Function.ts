import mongoose from "mongoose";
import { IBalanceSheet, IBalanceSheetItems } from "../interface/IBalanceSheet";
import BalanceSheet from "../model/BalanceSheet.model";
import User from "../model/User.model";
import moment from "moment";
import { formatDate } from "../utils/Date";

const getBalanceSheetAmount = (items: IBalanceSheetItems[]) => {
  const totalCreditedAmount = items.reduce((acc, curr: IBalanceSheetItems) => {
    return acc + (curr.status === "CREDIT" ? curr.amount : 0);
  }, 0);

  const totalDebitedAmount = items.reduce((acc, curr: IBalanceSheetItems) => {
    return acc + (curr.status === "DEBIT" ? curr.amount : 0);
  }, 0);

  return { totalCreditedAmount, totalDebitedAmount };
};

export async function createBalanceSheet(user: string, body: IBalanceSheet) {
  const { items } = body;

  const { totalDebitedAmount, totalCreditedAmount } =
    getBalanceSheetAmount(items);

  const balanceSheetObj = await BalanceSheet.create({
    ...body,
    totalCreditedAmount,
    totalDebitedAmount,
    user,
  });

  await User.findByIdAndUpdate(user, {
    $set: {
      balanceSheet: balanceSheetObj._id,
    },
  });

  return balanceSheetObj;
}

export async function getBalanceSheet(_id: string) {
  return await BalanceSheet.findById(_id);
}

export async function getAllUserBalanceSheet(user: string) {
  return await BalanceSheet.find({ user }).populate("user");
}

export async function getItemDetails(balanceSheet: string, _id: string) {
  const balanceSheetObj = await BalanceSheet.findOne({
    _id: new mongoose.Types.ObjectId(balanceSheet),
  }).select({
    items: { $elemMatch: { _id: new mongoose.Types.ObjectId(_id) } },
  });

  return balanceSheetObj?.items[0];
}

export async function insertItems(_id: string, body: IBalanceSheetItems) {
  return await BalanceSheet.findByIdAndUpdate(_id, {
    $push: {
      items: body,
    },
    $inc: {
      totalCreditedAmount: body.status === "CREDIT" ? body.amount : 0,
      totalDebitedAmount: body.status === "DEBIT" ? body.amount : 0,
    },
  });
}

export async function updateItem(
  balanceSheet: string,
  _id: string,
  body: IBalanceSheetItems,
) {
  const itemObj = await getItemDetails(balanceSheet, _id);

  if (itemObj?.status !== body.status) {
    return await BalanceSheet.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(balanceSheet),
        "items._id": new mongoose.Types.ObjectId(_id),
      },
      {
        $set: {
          "items.$": body,
        },
        $inc: {
          totalCreditedAmount:
            body.status === "CREDIT" ? body.amount : -body.amount,
          totalDebitedAmount:
            body.status === "DEBIT" ? body.amount : -body.amount,
        },
      },
    );
  }

  return await BalanceSheet.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(balanceSheet),
      "items._id": new mongoose.Types.ObjectId(_id),
    },
    {
      $set: {
        "items.$": body,
      },
      $inc: {
        totalCreditedAmount:
          body.status === "CREDIT" ? body.amount - itemObj.amount : 0,
        totalDebitedAmount:
          body.status === "DEBIT" ? body.amount - itemObj.amount : 0,
      },
    },
  );
}

export async function deleteItem(balanceSheet: string, _id: string) {
  const itemDetails = await getItemDetails(balanceSheet, _id);

  if (itemDetails) {
    return await BalanceSheet.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(balanceSheet) },
      {
        $pull: {
          items: {
            _id: new mongoose.Types.ObjectId(_id),
          },
        },
        $inc: {
          totalDebitedAmount:
            itemDetails.status === "DEBIT" ? -itemDetails?.amount : 0,
          totalCreditedAmount:
            itemDetails.status === "CREDIT" ? -itemDetails?.amount : 0,
        },
      },
    );
  }
}

export async function getBalanceSheetDashboard(
  user: string,
  start: string,
  end: string,
) {
  console.log(start, end, user);
  return await BalanceSheet.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user), // replace "user_id" with the actual id
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$items",
    },
    {
      $match: {
        "items.date": {
          $gte: formatDate(start),
          $lte: formatDate(end),
        },
      },
    },
    {
      $group: {
        _id: null,
        user: {
          $first: {
            personalDetails: "$user.personalDetails",
            companyDetails: "$user.companyDetails",
          },
        },
        totalCreditedAmount: {
          $sum: {
            $cond: [{ $eq: ["$items.status", "CREDIT"] }, "$items.amount", 0],
          },
        },
        totalDebitedAmount: {
          $sum: {
            $cond: [{ $eq: ["$items.status", "DEBIT"] }, "$items.amount", 0],
          },
        },
        items: { $push: "$items" },
      },
    },
  ]);
}
