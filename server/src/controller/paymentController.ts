import { NextFunction, Request, Response } from "express";
import { logger } from "../_core/Logger";
import { z } from "zod";
import { paymentModel } from "../models/paymentModel";
import { HttpStatus } from "../utils/HttpStatus";

const paymentSchema = z.object({
  noPlaque: z.string().min(1),
  tax_id: z.number().int().positive(),
  agent_id: z.number().int().positive(),
  pos_id: z.number().int().positive(),
  amount: z.number().int().positive(),
  reason: z.string().min(1),
});

export const PaymentController = {
  createPayment: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: "Bad request" });
      return;
    }
    try {
      const data = {
        noPlaque: req.body.noPlaque,
        tax_id: parseInt(req.body.denomination),
        agent_id: req.userId,
        pos_id: req.posId,
        amount: req.body.montant,
        reason: req.body.motif,
      };
      const validatedData = paymentSchema.parse(data);
      const newPayment = await paymentModel.createPayment(validatedData);
      res.status(201).json(newPayment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: error.errors });
      } else {
        next(error);
      }
      logger.error(error);
    }
  },
  getPaymentById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = parseInt(req.params.id);
      const payment = await paymentModel.getPaymentById(paymentId);
      if (!payment) {
        res.status(HttpStatus.NOT_FOUND).send({ message: "Payment not found" });
        return;
      }
      res.json(payment);
    } catch (error) {
      next(error);
      logger.error(error);
    }
  },
};
