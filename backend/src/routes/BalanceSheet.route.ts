import { Router } from "express";
import AuthMiddleware from "../middleware/Auth.middleware";
import {
  createBalanceSheetModel,
  deleteBalanceSheetItemModel,
  getBalanceSheetModel,
  getDashboardBalanceSheetModel,
  getUserBalanceSheetModel,
  insertBalanceSheetItemModel,
  updateBalanceSheetItemModel,
} from "../controllers/BalanceSheet.Controller";

const router = Router();

router.use(AuthMiddleware);

router.route("/create").post(createBalanceSheetModel);

router.route("/details").get(getBalanceSheetModel);

router.route("/user").get(getUserBalanceSheetModel);

router.route("/item/update").put(updateBalanceSheetItemModel);

router.route("/item/create").put(insertBalanceSheetItemModel);

router.route("/item/delete").put(deleteBalanceSheetItemModel);

router.route("/reports").get(getDashboardBalanceSheetModel);
export default router;
