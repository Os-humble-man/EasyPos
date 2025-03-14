import { TaxesType } from "@prisma/client";
import prisma from "../_core/database";

export const taxModel = {
  createTax: async (data: {
    name: string;
    type: TaxesType;
    amount: number;
  }) => {
    try {
      const tax = await prisma.taxes.create({
        data: {
          name: data.name,
          type: data.type,
          amount: data.amount,
        },
      });
      return tax;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getTax: async (id: number) => {
    try {
      const tax = await prisma.taxes.findUnique({
        where: {
          id,
        },
      });
      return tax;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateTax: async (
    id: number,
    data: {
      name?: string;
      type?: TaxesType;
      amount?: number;
    }
  ) => {
    try {
      const tax = await prisma.taxes.update({
        where: {
          id,
        },
        data,
      });
      return tax;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getAllTaxes: async () => {
    try {
      const taxs = await prisma.taxes.findMany();
      return taxs;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  //   desactivateTax: async (id: number) => {
  //     try {
  //       const tax = await prisma.taxes.update({
  //         where: {
  //           id,
  //         },
  //         data: {
  //           active: false,
  //         },
  //       });
  //       return tax;
  //     } catch (error: any) {
  //       throw new Error(error);
  //     }
  //   },
  //   activateTax: async (id: number) => {
  //     try {
  //       const tax = await prisma.taxes.update({
  //         where: {
  //           id,
  //         },
  //         data: {
  //           active: true,
  //         },
  //       });
  //       return tax;
  //     } catch (error: any) {
  //       throw new Error(error);
  //     }
  //   },
  deleteTax: async (id: number) => {
    try {
      const tax = await prisma.taxes.delete({
        where: {
          id,
        },
      });
      return tax;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
