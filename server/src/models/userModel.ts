import bcrypt from "bcrypt";
import prisma from "../_core/database";
import jwt from "jsonwebtoken";

import { logger } from "../_core/Logger";

export const userModel = {
  createUser: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await prisma.users.create({
        data: {
          name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  },
  login: async (email: string, password: string) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      return user.id;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  },
  refreshToken: async (refreshToken: string) => {
    try {
      const tokenInDb = await prisma.refreshToken.findMany({
        where: { token: refreshToken },
      });
      if (!tokenInDb) throw new Error("Invalid refresh token");
      if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error("JWT_REFRESH_SECRET is not defined");
      }
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      ) as jwt.JwtPayload;
      return decoded.userId;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  },
};
