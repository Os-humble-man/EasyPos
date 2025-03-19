import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
}

export class JwtHelper {
  static generateToken(
    payload: JwtPayload,
    expiresIn: SignOptions["expiresIn"] = "1h"
  ): string {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new Error("JWT_SECRET_KEY is not defined in .env");
    }

    return jwt.sign(payload, jwtSecretKey, { expiresIn });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      if (!jwtSecretKey) {
        throw new Error("JWT_SECRET_KEY is not defined in .env");
      }

      return jwt.verify(token, jwtSecretKey) as JwtPayload;
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
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new Error("JWT_SECRET_KEY is not defined in .env");
    }

    return jwt.sign(payload, jwtSecretKey, { expiresIn });
  }
}
