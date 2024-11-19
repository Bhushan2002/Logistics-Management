import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export default function createToken(payload: any) {
  return jwt.sign(payload, process.env.JWTSECRET!, {
    expiresIn: "7d",
  });
}
