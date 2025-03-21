import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  user: {
    userId: number;
    posId: number | null;
    role: string;
  };
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access forbidden: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access forbidden: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded.user.userId;
    req.posId = decoded.user.posId || null;
    req.role = decoded.user.role;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired at:", error.expiredAt);
      res.status(401).json({ message: "Access forbidden: Token expired" });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Access forbidden: Invalid token" });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
