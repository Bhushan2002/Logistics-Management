import z from "zod";

const salutations = ["mr", "mrs", "ms"] as const;
const statuses = ["PAID", "UNPAID"] as const;

export const billDetailsSchema = z.object({
  _id: z.string().optional(),
  salutation: z.enum(salutations),
  name: z.string(),
  address: z.string(),
  phone: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Invalid phone number."
  }),
})

export const itemDetailsSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  vehicleNumber: z.string(),
  date: z.string(),
  from: z.string(),
  to: z.string(),
  lrNumber: z.string(),
  units: z.number(),
  rate: z.number(),
  total: z.number(),
  detention: z.number(),
  advance: z.number(),
  grandTotal: z.number(),
})

export const invoiceDetailsSchema = z.object({
  _id: z.string().optional(),
  invoiceId: z.number().optional(),
  invoiceStatus: z.enum(statuses),
  date: z.string(),
  billFrom: billDetailsSchema,
  billTo: billDetailsSchema,
  subTotal: z.number(),
  gstPercentage: z.number(),
  gstAmount: z.number(),
  totalAdvanceAmount: z.number(),
  grandTotal: z.number(),
  note: z.string().optional(),
  items: z.array(itemDetailsSchema).optional(),
})

export type BillDetails = z.infer<typeof billDetailsSchema>
export type ItemDetails = z.infer<typeof itemDetailsSchema>
export type InvoiceDetails = z.infer<typeof invoiceDetailsSchema>