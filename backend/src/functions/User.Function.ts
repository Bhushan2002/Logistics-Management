import mongoose from "mongoose";
import { IUser } from "../interface/IUser";
import User from "../model/User.model";

export async function createUser(body: IUser) {
  return await User.create(body);
}

export const getUser = async (id: string) => {
  return await User.findById(id);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ "personalDetails.email": email });
};

export const loginUser = async (email: string, password: string) => {
  const userObj = await getUserByEmail(email);

  if (!userObj) {
    return {
      success: false,
      message: "User not found",
    };
  } else if (userObj.personalDetails.password !== password) {
    return {
      success: false,
      message: "Incorrect Password is entered",
    };
  }
  return {
    success: true,
    message: "User logged in successfully",
    user: userObj,
  };
};

export const updateUser = async (id: string, body: IUser) => {
  return await User.findByIdAndUpdate(id, body, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

