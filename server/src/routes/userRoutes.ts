import { Router } from "express";
import { userController } from "../controller/userController";

const userRouter = Router();

userRouter.post("/auth/register", userController.createUser);
userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/refresh-token", userController.refresh);

export default userRouter;
