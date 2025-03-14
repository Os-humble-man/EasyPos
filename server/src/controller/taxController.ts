import { NextFunction, Request, Response } from "express";
import { taxModel } from "../models/taxModel";
import { HttpStatus } from "../utils/HttpStatus";
import { logger } from "../_core/Logger";
import { z } from "zod";
import { TaxesType } from "@prisma/client";

const taxSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.nativeEnum(TaxesType),
  amount: z.number(),
});

export const taxController = {
  createTax: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.body) {
        res.status(HttpStatus.BAD_REQUEST).send({ message: "Bad request" });
        return;
      }
      const validatedData = taxSchema.parse(req.body);

      const newTax = await taxModel.createTax(validatedData);
      res.status(201).json(newTax);
    } catch (error: Error | any) {
      if (error) {
        res.status(400).json({ errors: error.errors });
      } else {
        next(error);
      }
      logger.error(error);
    }
  },

  updateTax: async (req: Request, res: Response) => {
    try {
      const updatedTax = await taxModel.updateTax(
        parseInt(req.params.id, 10),
        req.body
      );
      res.status(200).json(updatedTax);
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to update tax", error: error.message });
    }
  },

  deleteTax: async (req: Request, res: Response) => {
    try {
      const deletedTax = await taxModel.deleteTax(parseInt(req.params.id, 10));
      res.status(200).json(deletedTax);
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to delete tax", error: error.message });
    }
  },

  getAllTaxes: async (req: Request, res: Response) => {
    try {
      const taxes = await taxModel.getAllTaxes();
      res.status(200).json(taxes);
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve taxes", error: error.message });
    }
  },

  getTax: async (req: Request, res: Response) => {
    try {
      const tax = await taxModel.getTax(parseInt(req.params.id, 10));
      if (!tax) {
        res.status(404).json({ message: "Tax not found" });
      } else {
        res.status(200).json(tax);
      }
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve tax", error: error.message });
    }
  },
};
