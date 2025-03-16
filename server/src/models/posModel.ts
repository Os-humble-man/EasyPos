import { PosDevices } from "@prisma/client";
import prisma from "../_core/database";

export const posModel = {
  createPos: async (data: {
    agent_id: number;
    device_name: string;
    status: "active" | "inactive";
    location: string;
  }): Promise<PosDevices> => {
    try {
      const pos = await prisma.posDevices.create({
        data,
      });
      return pos;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getPos: async (id: number): Promise<PosDevices | null> => {
    try {
      const pos = await prisma.posDevices.findUnique({
        where: {
          id,
        },
      });
      return pos;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getAllPos: async (): Promise<PosDevices[]> => {
    try {
      const pos = await prisma.posDevices.findMany();
      return pos;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  updatePos: async (
    id: number,
    data: { agent_id?: number; device_name?: string; location?: string }
  ): Promise<PosDevices> => {
    try {
      const pos = await prisma.posDevices.update({
        where: {
          id,
        },
        data,
      });
      return pos;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  deletePos: async (id: number): Promise<PosDevices> => {
    try {
      const pos = await prisma.posDevices.delete({
        where: {
          id,
        },
      });
      return pos;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
