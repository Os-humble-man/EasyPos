import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { userModel } from "../models/userModel";
import { logger } from "../_core/Logger";
import { generateTokens } from "../services/auth.service";

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  status: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const userController = {
  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedData = userSchema.parse(req.body);
      const newUser = await userModel.createUser(validatedData);
      res.status(201).json({ name: newUser.name, id: newUser.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        next(error);
      }
      logger.error(error);
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const validatedData = loginSchema.parse(req.body);
      const user = await userModel.login(
        validatedData.email,
        validatedData.password
      );

      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const token = await generateTokens(user);

      res.status(200).json({
        message: "Login successful",
        accessToken: token.accessToken,
      });
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Internal server error " + error + error?.message });
      logger.error(error);
    }
  },

  refresh: async (req: Request, res: Response): Promise<void> => {
    logger.info("Refresh token");

    try {
      const refreshToken = await userModel.getRefreshTokenById(req.userId);
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token required" });
        return;
      }
      const userId = await userModel.refreshToken(refreshToken);
      const newTokens = await generateTokens(userId);
      res.json(newTokens);
    } catch (error) {
      res.status(403).json({ message: "Expired or invalid token" });
    }
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await userModel.getUsers();
      res.status(200).json(users);
    } catch (error: Error | any) {
      logger.error(error);
    }
  },

  isAuthenticated: (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userId || !req.posId || !req.role) {
      res.status(401).json({
        message: "Non authentifié",
        isAuthenticated: false,
      });
      return;
    }

    res.status(200).json({
      data: {
        // userId: req.userId,
        // posId: req.posId,
        role: req.role,
        isAuthenticated: true,
      },
      message: "Authentifié",
    });
  },
};
