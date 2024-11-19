import { Request, Response } from "express";
import { IUser } from "../interface/IUser";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
} from "../functions/User.Function";
import {
  ErrorHandler,
  InvalidUserHandler,
  ServerErrorHandler,
  SuccssHandler,
} from "../handlers/Request";
import { connectDatabase, disconnectDatabase } from "../config/Mongo";
import createToken from "../utils/Jwt";
import { IAuth } from "../interface/IAuth";
export const createUserModel = async (req: Request, res: Response) => {
  try {
    const body: IUser = req.body;

    await connectDatabase();

    const userObj = await createUser(body);

    await disconnectDatabase();

    userObj && userObj._id
      ? SuccssHandler(res, userObj, "User Created Successfully")
      : ErrorHandler(res, "Unable to create user");
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};

export const getUserModel = async (req: Request, res: Response) => {
  try {
    await connectDatabase();

    const userObj = await getUser(req.params.id);

    await disconnectDatabase();

    userObj && userObj._id
      ? SuccssHandler(res, userObj, "User Details Found")
      : ErrorHandler(res, "Unable to find userDetails user");
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};

export const loginUserModel = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    await connectDatabase();

    const { success, user, message } = await loginUser(email, password);

    await disconnectDatabase();

    success
      ? SuccssHandler(
          res,
          {
            email: user?.personalDetails?.email,
            accessToken: createToken({ _id: user?._id, role: "user" }),
          },
          message,
        )
      : ErrorHandler(res, message);
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};
export const getUserTokenModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;

    user && user._id
      ? SuccssHandler(res, user, "User Details Found")
      : ErrorHandler(res, "Unable to find userDetails user");
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};
export const updateUserModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;

    if (user?._id) {
      const body: IUser = req.body;

      await connectDatabase();

      const userObj = await updateUser(user?._id, body);

      await disconnectDatabase();

      return userObj && userObj._id
        ? SuccssHandler(res, userObj, "User Created Successfully")
        : ErrorHandler(res, "Unable to create user");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};
export const deleteUserModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;

    if (user?._id) {
      const body: IUser = req.body;

      await connectDatabase();

      const userObj = await deleteUser(user?._id);

      await disconnectDatabase();

      return userObj
        ? SuccssHandler(res, userObj, "User Created Successfully")
        : ErrorHandler(res, "Unable to create user");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};
