import express, { Router } from "express";
import { logger } from "../_core/Logger";
import userRouter from "./userRoutes";
import taxRouter from "./taxRoutes";
import paymentRouter from "./paymentRoutes";
import posRouter from "./posRoutes";

type Express = ReturnType<typeof express>;

const makeApiRouter = (app: Express) => {
  const rootRouter = Router();
  const apiRouter = Router();

  rootRouter.use("/api", apiRouter);
  apiRouter.use(userRouter);
  apiRouter.use(taxRouter);
  apiRouter.use(paymentRouter);
  apiRouter.use(posRouter);

  app.use(rootRouter);

  logger.info("All Routes have been registered!");
};

export { makeApiRouter };
