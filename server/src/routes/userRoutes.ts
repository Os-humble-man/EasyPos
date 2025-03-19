import { Router } from "express";
import { userController } from "../controller/userController";
import { authenticate } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/register", authenticate, userController.createUser);
userRouter.get("/auth/check", authenticate, userController.isAuthenticated);

userRouter.post("/auth/refresh-token", userController.refresh);
userRouter.get("/users", userController.getUsers);

export default userRouter;
