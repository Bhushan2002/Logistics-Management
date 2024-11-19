import z from "zod";

export const incomeItemSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  amount: z.number(),
  date: z.string(),
  mode: z.string()
})

export const incomeSchema = z.object({
  _id: z.string().optional(),
  totalAmount: z.number(),
  dueAmount: z.number(),
  items: z.array(incomeItemSchema)
})

export type IncomeItem = z.infer<typeof incomeItemSchema>
export type Income = z.infer<typeof incomeSchema>