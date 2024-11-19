import z from "zod";
import { customerCompanyDetailsSchema, customerPersonalDetailsSchema, customerSchema } from "../../customers/_data/schema";
import { incomeSchema } from "../../customers/incomes/[customerId]/view/[tripId]/_data/schema";
import { expenseSchema } from "../../customers/expenses/[customerId]/view/[tripId]/_data/schema";


const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;
const salutations = ["mr", "mrs", "ms"] as const;

export const primaryDetailsTripSchema = z.object({
  title: z.string(),
  vehicleNumber: z.string(),
  from: z.string(),
  to: z.string(),
  status: z.enum(statuses),
  date: z.string(),
  lrNumber: z.string().optional(),
})

export const financeDetailsTripSchema = z.object({
  units: z.number(),
  rate: z.number(),
  subTotalAmount: z.number().min(0),
  isGST: z.boolean(),
  gstPercentage: z.number().min(0).optional(),
  gstAmount: z.number().min(0),
  totalAmount: z.number().min(0),
  advanceAmount: z.number().min(0),
  commissionAmount: z.number().min(0),  
  tsdShortageAmount: z.number().min(0),
  dueAmount: z.number().min(0),
  courier: z.string()
})

export const driverDetailsTripSchema = z.object({
  salutation: z.enum(salutations),
  firstName: z.string()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(50, { message: "Must be 50 or fewer characters long" }),
  lastName: z.string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  phone: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Invalid phone number."
  }).optional(),
})

export const tripSchema = z.object({
  _id: z.string().optional(),
  primaryDetails: primaryDetailsTripSchema,
  financeDetails: financeDetailsTripSchema,
  driverDetails: driverDetailsTripSchema,
  incomeDetails: incomeSchema.optional(),
  expenseDetails: expenseSchema.optional(),
})

export const customerWithTripSchema = z.object({
  customer: z.object({
    _id: z.string().optional(),
    personalDetails: customerPersonalDetailsSchema,
    companyDetails: customerCompanyDetailsSchema
  }),
  trip: tripSchema,
})

export type PrimaryDetailsTrip = z.infer<typeof primaryDetailsTripSchema>;
export type FinanceDetailsTrip = z.infer<typeof financeDetailsTripSchema>;
export type DriverDetailsTrip = z.infer<typeof driverDetailsTripSchema>;
export type Trip = z.infer<typeof tripSchema>;
export type CustomerWithTrip = z.infer<typeof customerWithTripSchema>;