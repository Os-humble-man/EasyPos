import { NextFunction, Request, Response } from "express";
import { logger } from "../_core/Logger";
import { JwtHelper } from "../utils/JwtHelper";

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw logger.error("Missing or wrong Authorization request header");
    }

    const accessToken = authorizationHeader
      .replace(/Bearer/gi, "")
      .replace(/ /g, "");

    let credentials: any = {};

    try {
      credentials = JwtHelper.verifyToken(accessToken);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        credentials = await JwtHelper.decodeToken(accessToken);
        logger.warn("Token expired, refreshing token");
      } else {
        throw error;
      }
    }

    req.user = accessToken;

    next();
  } catch (error: any) {
    next(error);
  }
};

export { authMiddleware };
