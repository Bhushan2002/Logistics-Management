import { Router } from "express";
import AuthMiddleware from "../middleware/Auth.middleware";
import {
  createCustomerModel,
  deleteCustomerModel,
  getAllCustomerModel,
  getCustomerModel,
  updateCustomerModel,
} from "../controllers/Customer.Controller";

const router = Router();

router.use(AuthMiddleware);

router.route("/").post(createCustomerModel).get(getAllCustomerModel);

router
  .route("/details/:id")
  .get(getCustomerModel)
  .put(updateCustomerModel)
  .delete(deleteCustomerModel);

export default router;
