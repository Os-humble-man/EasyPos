// src/types/express.d.ts
import "express";

declare module "express" {
  interface Request {
    userId?: number;
    posId?: number | null;
    role?: string;
  }
}
