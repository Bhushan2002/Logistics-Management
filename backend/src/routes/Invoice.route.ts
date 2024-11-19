import { Router } from "express";
import AuthMiddleware from "../middleware/Auth.middleware";
import {
  createInvoiceModel,
  deleteInvoiceModel,
  getCustomerInvoiceModel,
  getInvoiceModel,
  getUserInvoicesModel,
  updateInvoiceModel,
} from "../controllers/Invoice.Controller";

const router = Router();

router.use(AuthMiddleware);

router.route("/").post(createInvoiceModel).get(getUserInvoicesModel);

router.route("/details/:id").get(getInvoiceModel).put(updateInvoiceModel);

router.route("/customer/:id").get(getCustomerInvoiceModel);

router.route("/delete").post(deleteInvoiceModel);

export default router;
