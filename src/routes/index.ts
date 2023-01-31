import { Router } from "express";
import userController from "../controller/user.controller";
import validateMiddleware from "../middleware/validate.middleware";
import { verifyToken } from "../middleware/verifyToken";
import { validationSignUp } from "../validate/validate";

const router = Router();

export default router
  .get("/user/", verifyToken, userController.GET)
  .post("/users/login", userController.POST_LOGIN)
  .post(
    "/users/sign",
    validateMiddleware(validationSignUp),
    userController.POST_SIGN
  )
  .put("/user/update", verifyToken, userController.PUT);
