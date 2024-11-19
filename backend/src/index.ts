import express, { Express, Request, Response } from "express";
import serverless from "serverless-http";
import cors from "cors";
import userRoutes from "./routes/User.route";
import balanceSheetRoutes from "./routes/BalanceSheet.route";
import customerRoutes from "./routes/Customer.route";
import tripRoutes from "./routes/Trip.route";
import invoiceRoutes from "./routes/Invoice.route";
import { connectDatabase } from "./config/Mongo";

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/balance-sheet", balanceSheetRoutes);
app.use("/customer", customerRoutes);
app.use("/trip", tripRoutes);
app.use("/invoice",invoiceRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome from Lambda server");
});

const LOCAL_PORT = 9000;


app.listen(LOCAL_PORT, () => {
  console.log("Server is running on port " + LOCAL_PORT + " 🚀");
});

export const handler = serverless(app);
