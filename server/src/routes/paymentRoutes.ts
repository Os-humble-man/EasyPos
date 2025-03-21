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

paymentRouter.get(
  "/payment/total",
  authenticate,
  PaymentController.getTotalAmount
);

paymentRouter.get(
  "/payment/total_transactions",
  authenticate,
  PaymentController.getTotalTrans
);

paymentRouter.get("/payments", authenticate, PaymentController.getAllPayments);

export default paymentRouter;
