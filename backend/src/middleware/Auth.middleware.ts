import { Request, Response, NextFunction } from "express";
import { IAuth } from "../interface/IAuth";
import { ErrorHandler, ServerErrorHandler } from "../handlers/Request";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { connectDatabase, disconnectDatabase } from "../config/Mongo";
import { getUser } from "../functions/User.Function";
import { IUser } from "../interface/IUser";
config();

export default async function AuthMiddleware(
  req: IAuth,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return ErrorHandler(res, "Please enter valid token");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWTSECRET!,
    ) as JwtPayload;

    await connectDatabase();

    const user = await getUser(decodedToken?._id);

    await disconnectDatabase();

    req.user = user as IUser;

    next();
  } catch (error) {
    return ErrorHandler(res, "Token expired please login again");
  }
}
