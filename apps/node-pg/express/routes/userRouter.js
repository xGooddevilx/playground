import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
