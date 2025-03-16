import { Payments } from "@prisma/client";
import prisma from "../_core/database";
import { logger } from "../_core/Logger";

export const paymentModel = {
  createPayment: async (data: {
    noPlaque: string;
    tax_id: number;
    agent_id: number;
    pos_id: number;
    amount: number;
    reason: string;
  }) => {
    try {
      const payment = await prisma.payments.create({
        data: {
          noPlaque: data.noPlaque,
          tax_id: data.tax_id,
          agent_id: data.agent_id,
          pos_id: data.pos_id,
          amount: data.amount,
          reason: data.reason,
        },
      });
      return payment;
    } catch (error: Error | any) {
      logger.error(error);
    }
  },
};
