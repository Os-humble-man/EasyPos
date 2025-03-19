import { Router } from "express";
import { PaymentController } from "../controller/paymentController";
import { authenticate } from "../middleware/authMiddleware";

const paymentRouter = Router();
paymentRouter.post("/payment", authenticate, PaymentController.createPayment);
paymentRouter.get(
  "/payment/:id",
  authenticate,
  PaymentController.getPaymentById
);

export default paymentRouter;
