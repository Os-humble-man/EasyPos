import prisma from "../_core/database";
import { logger } from "../_core/Logger";

function genererReferencePaiement(agentId: number, posId: number): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const dateTime = `${day}${hour}${minutes}`;
  const random = Math.floor(Math.random() * 90 + 10);

  return `${agentId}-${posId}-${dateTime}-${random}`;
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

  getPaymentById: async (id: number) => {
    try {
      const payment = await prisma.payments.findUnique({
        where: { id },
        include: {
          users: true,
          pos_devices: true,
          taxes: true,
        },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      return {
        id: payment.id,
        noPlaque: payment.noPlaque,
        amount: payment.amount,
        reason: payment.reason,
        payment_method: payment.payment_method,
        payment_date: payment.payment_date,
        reference: payment.reference,
        agent: {
          id: payment.users.id,
          name: payment.users.name,
          last_name: payment.users.last_name,
          email: payment.users.email,
        },
        pos: {
          id: payment.pos_devices.id,
          device_name: payment.pos_devices.device_name,
          location: payment.pos_devices.location,
          status: payment.pos_devices.status,
        },
        tax: {
          id: payment.taxes.id,
          name: payment.taxes.name,
          type: payment.taxes.type,
          amount: payment.taxes.amount,
        },
      };
    } catch (error: any) {
      logger.error(error);
      throw new Error(
        error.message || "An error occurred while fetching the payment"
      );
    }
  },
};
