import { Router } from "express";
import { userController } from "../controller/userController";
// import printerController from "../controller/printerController";

const userRouter = Router();

userRouter.post("/auth/register", userController.createUser);
userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/refresh-token", userController.refresh);
userRouter.get("/users", userController.getUsers);

// userRouter.post("/connect", printerController.connect);
// userRouter.post("/print", printerController.print);

export default userRouter;
