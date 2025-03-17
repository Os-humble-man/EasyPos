import { Payments } from "@prisma/client";
import prisma from "../_core/database";
import { logger } from "../_core/Logger";

function genererReferencePaiement(agentId: number, posId: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const secondes = String(now.getSeconds()).padStart(2, "0");
  const dateTime = `${year}${month}${day}${hour}${minutes}${secondes}`;
  const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const referencePaiement = `REF-${agentId}-POS${posId}-${dateTime}-${random}`;
  return referencePaiement;
}

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
      const referenceNumber = genererReferencePaiement(
        data.agent_id,
        data.pos_id
      );
      const payment = await prisma.payments.create({
        data: {
          noPlaque: data.noPlaque,
          tax_id: data.tax_id,
          agent_id: data.agent_id,
          pos_id: data.pos_id,
          amount: data.amount,
          reason: data.reason,
          reference: referenceNumber,
        },
      });
      return payment;
    } catch (error: Error | any) {
      logger.error(error);
    }
  },
};
