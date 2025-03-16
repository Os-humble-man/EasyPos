import { Router } from "express";
import { posController } from "../controller/posController";

const posRouter = Router();

posRouter.post("/pos", posController.createPos);
posRouter.get("/pos", posController.getAllPos);
posRouter.get("/pos/:id", posController.getPos);
posRouter.put("/pos/:id", posController.updatePos);
posRouter.delete("/pos/:id", posController.deletePos);

export default posRouter;
