import bcrypt from "bcrypt";
import prisma from "../_core/database";
import jwt from "jsonwebtoken";

import { UsersStatus, UsersRole, Users } from "@prisma/client";

export const userModel = {
  createUser: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    password: string;
  }) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await prisma.users.create({
        data: {
          name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          role: data.role as UsersRole,
          status: data.status as UsersStatus,
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
        include: {
          posDevices: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

    console.log("user",user);
    

      return {
        userId: user.id,
        posId: user.posDevices.length > 0 ? user.posDevices[0].id : null,
        role:user.role // Retourne l'ID du premier POS associé (ou null si aucun)
      };
    } catch (error: Error | any) {
      throw new Error(error.message); // Renvoyer l'erreur avec le message
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

  getUsers: async (): Promise<
    Array<
      Pick<Users, "id" | "name" | "last_name" | "email" | "role" | "status">
    >
  > => {
    try {
      return await prisma.users.findMany({
        select: {
          id: true,
          name: true,
          last_name: true,
          email: true,
          role: true,
          status: true,
        },
      });
    } catch (error: unknown) {
      console.error("Failed to get users", error);
      return [];
    }
  },
  getUser: async (
    userId: number
  ): Promise<Pick<
    Users,
    "id" | "name" | "last_name" | "email" | "role" | "status"
  > | null> => {
    try {
      return await prisma.users.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          last_name: true,
          email: true,
          role: true,
          status: true,
        },
      });
    } catch (error: any) {
      console.error("Failed to get user", error);
      return null;
    }
  },
};
