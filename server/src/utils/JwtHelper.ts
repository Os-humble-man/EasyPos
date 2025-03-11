import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../_core/config";

interface JwtPayload {
  userId: string;
  email: string;
}
console.log(config);

export class JwtHelper {
  static generateToken(
    payload: JwtPayload,
    expiresIn: SignOptions["expiresIn"] = "1h"
  ): string {
    return jwt.sign(payload, config.jwtSecretKey, { expiresIn });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, config.jwtSecretKey) as JwtPayload;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }

  static generateRefreshToken(
    payload: JwtPayload,
    expiresIn: SignOptions["expiresIn"] = "7d"
  ): string {
    return jwt.sign(payload, config.jwtSecretKey, { expiresIn });
  }
}
