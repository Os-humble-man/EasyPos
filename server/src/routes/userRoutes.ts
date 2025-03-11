import { Router } from "express";
import { userController } from "../controller/userController";

const userRouter = Router();

userRouter.post("/users", userController.createUser);

export default userRouter;
