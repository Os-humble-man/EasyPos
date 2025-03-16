import { NextFunction, Request, Response } from "express";
import { posModel } from "../models/posModel";
import { logger } from "../_core/Logger";
import { z } from "zod";
import { HttpStatus } from "../utils/HttpStatus";

enum Status {
  Active = "active",
  Inactive = "inactive",
}

const posSchema = z.object({
  agent_id: z.number().int().positive(),
  device_name: z.string().min(1),
  status: z.nativeEnum(Status),
  location: z.string().min(1),
});

export const posController = {
  getAllPos: async (req: Request, res: Response) => {
    try {
      const pos = await posModel.getAllPos();
      res.status(200).json(pos);
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve pos", error: error.message });
    }
  },
  getPos: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const pos = await posModel.getPos(id);
      if (!pos) {
        res.status(404).json({ message: "Pos not found" });
      } else {
        res.status(200).json(pos);
      }
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve pos", error: error.message });
    }
  },
  createPos: async (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.body);
    try {
      const validatedData = posSchema.parse(req.body);
      const newPos = await posModel.createPos(validatedData);
      res.status(201).json(newPos);
    } catch (error: Error | any) {
      if (error instanceof z.ZodError) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: error.errors });
      } else {
        next(error);
      }
      logger.error(error);
    }
  },
  updatePos: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const pos = await posModel.updatePos(id, req.body);
      res.status(200).json(pos);
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to update pos", error: error.message });
    }
  },
  deletePos: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const pos = await posModel.deletePos(id);
      res.status(200).json(pos);
    } catch (error: Error | any) {
      res
        .status(500)
        .json({ message: "Failed to delete pos", error: error.message });
    }
  },
};
