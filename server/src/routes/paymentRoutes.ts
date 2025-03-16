import { Router } from "express";
import { PaymentController } from "../controller/paymentController";

const paymentRouter = Router();
// paymentRouter.get("/taxes", taxController.getAllTaxes);
paymentRouter.post("/payment", PaymentController.createPayment);
// paymentRouter.put("/taxe", taxController.updateTax);
// paymentRouter.delete("/taxe", taxController.deleteTax);

export default paymentRouter;
