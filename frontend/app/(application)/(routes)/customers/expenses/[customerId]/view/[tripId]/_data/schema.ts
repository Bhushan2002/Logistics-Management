import z from "zod";

export const expenseItemSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  amount: z.number(),
  date: z.string(),
  mode: z.string()
})

export const expenseSchema = z.object({
  _id: z.string().optional(),
  totalAmount: z.number(),
  items: z.array(expenseItemSchema)
})

export type ExpenseItem = z.infer<typeof expenseItemSchema>
export type Expense = z.infer<typeof expenseSchema>