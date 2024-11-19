import { Router } from "express";
import AuthMiddleware from "../middleware/Auth.middleware";
import {
  createTripModel,
  deleteSingleTripItemModel,
  deleteTripModel,
  getCustomerAllTripModel,
  getCustomerRangeTripModel,
  getExpenseTripModel,
  getFinanceTripModel,
  getIncomeTripModel,
  getSingleTripItemModel,
  getTripModel,
  getUserTripModel,
  updateExpenseTripModel,
  updateIncomeTripModel,
  updateTripModel,
} from "../controllers/Trip.Controller";

const router = Router();

router.use(AuthMiddleware);

router.route("/").post(createTripModel).get(getUserTripModel);

router.route("/details/:id").get(getTripModel).put(updateTripModel);

router.route("/customer/:id").get(getCustomerAllTripModel);

router.route("/item").post(getSingleTripItemModel);

router.route("/income/:id").put(updateIncomeTripModel).get(getIncomeTripModel);

router.route("/finance/:id").get(getFinanceTripModel);

router
  .route("/expense/:id")
  .get(getExpenseTripModel)
  .put(updateExpenseTripModel);

router.route("/item/delete").put(deleteSingleTripItemModel);

router.route("/delete").post(deleteTripModel);

router.route("/reports").get(getCustomerRangeTripModel);

export default router;
