import { Router } from "express";
import {
  createUserModel,
  deleteUserModel,
  getUserModel,
  getUserTokenModel,
  loginUserModel,
  updateUserModel,
} from "../controllers/User.Controller";
import AuthMiddleware from "../middleware/Auth.middleware";
const router = Router();

router.route("/").post(createUserModel);

router.use("/details", AuthMiddleware);

router
  .route("/details")
  .get(getUserTokenModel)
  .put(updateUserModel)
  .delete(deleteUserModel);

router.route("/details/:id").get(getUserModel);

router.route("/login").post(loginUserModel);

export default router;
