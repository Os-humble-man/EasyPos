import { Router } from "express";
import { PaymentController } from "../controller/paymentController";
import { authenticate } from "../middleware/authMiddleware";

const paymentRouter = Router();
// paymentRouter.get("/taxes", taxController.getAllTaxes);
paymentRouter.post("/payment", authenticate, PaymentController.createPayment);
// paymentRouter.put("/taxe", taxController.updateTax);
// paymentRouter.delete("/taxe", taxController.deleteTax);

export default paymentRouter;
