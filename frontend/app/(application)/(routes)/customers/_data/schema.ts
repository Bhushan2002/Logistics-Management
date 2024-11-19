import z from "zod";
import { tripSchema } from "../trips/_data/schema";
import { invoiceDetailsSchema } from "../invoices/[customerId]/_data/schema";

const types = ["individual", "company"] as const;
const salutations = ["mr", "mrs", "ms"] as const;

export const customerPersonalDetailsSchema = z.object({
  type: z.enum(types),
  salutation: z.enum(salutations),
  firstName: z.string()
  .min(2, { message: "Must be 2 or more characters long" })
  .max(50, { message: "Must be 50 or fewer characters long" }),
  lastName: z.string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  email: z.string().email({
    message: "Invalid email address."
  }).optional(),
  phone: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Invalid phone number."
  }),
})

export const customerCompanyDetailsSchema = z.object({
  name: z.string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  email: z.string().email({
    message: "Invalid email address."
  }).optional(),
  phone: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Invalid phone number."
  }).optional(),
  address: z.string()
    .min(10, { message: "Must be 10 or more characters long" })
    .max(100, { message: "Must be 60 or fewer characters long" }).optional(),
  panNumber: z.string().refine((val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
    message: "Invalid pan number."
  }).optional(),
  gstNumber: z.string().refine((val) => /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(val), {
    message: "Invalid gst number."
  }).optional(),
  isGST: z.boolean(),
})

export const customerSchema = z.object({
  _id: z.string().optional(),
  personalDetails: customerPersonalDetailsSchema,
  companyDetails: customerCompanyDetailsSchema,
  trips: tripSchema.array().optional(),
  invoices: invoiceDetailsSchema.array().optional(),
})

export type CustomerPersonalDetails = z.infer<typeof customerPersonalDetailsSchema>;
export type CustomerCompanyDetails = z.infer<typeof customerCompanyDetailsSchema>;
export type Customer = z.infer<typeof customerSchema>;