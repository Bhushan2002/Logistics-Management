import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IAuth extends Request {
  user?: JwtPayload;
}
