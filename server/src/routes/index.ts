import express, { Router } from "express";
import { logger } from "../_core/Logger";
import userRouter from "./userRoutes";
import taxRouter from "./taxRoutes";

type Express = ReturnType<typeof express>;

const makeApiRouter = (app: Express) => {
  const rootRouter = Router();
  const apiRouter = Router();

  rootRouter.use("/api", apiRouter);
  apiRouter.use(userRouter);
  apiRouter.use(taxRouter)

  app.use(rootRouter);

  logger.info("All Routes have been registered!");
};

export { makeApiRouter };
