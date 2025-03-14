import { Router } from "express";
import { taxController } from "../controller/taxController";

const taxRouter = Router();
taxRouter.get("/taxes", taxController.getAllTaxes);
taxRouter.post("/taxe", taxController.createTax);
taxRouter.put("/taxe", taxController.updateTax);
taxRouter.delete("/taxe", taxController.deleteTax);

export default taxRouter;
