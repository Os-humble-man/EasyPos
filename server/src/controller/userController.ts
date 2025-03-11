import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { userModel } from "../models/userModel";

const userSchema = z.object({
  name: z.string(),
  last_name: z.string(),
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
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        next(error);
      }
    }
  },
};
