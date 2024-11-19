import z from "zod"

const status = ["CREDIT", "DEBIT"] as const

export const balanceSheetEntrySchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  accountName: z.string(),
  amount: z.number().min(0, { message: "Amount must be greater than 0" }),
  status: z.enum(status),
  date: z.string()
})

export const balanceSheetSchema = z.object({
  totalCreditedAmount: z.number(),
  totalDebitedAmount: z.number(),
  items: z.array(balanceSheetEntrySchema)
})

export type BalanceSheetEntry = z.infer<typeof balanceSheetEntrySchema>
export type BalanceSheet = z.infer<typeof balanceSheetSchema>