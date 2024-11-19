import z from "zod"

const salutation = ["mr", "mrs", "ms"] as const

export const personalDetailsSchema = z.object({
  firstName: z.string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  lastName: z.string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  email: z.string().email({
    message: "Invalid email address."
  }),
  phone: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Invalid phone number."
  }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  salutation: z.enum(salutation),
  sign: z.string().optional()
})

export const companyDetailsSchema = z.object({
  name: z.string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(100, { message: "Must be 50 or fewer characters long" }),
  email: z.string().email({
    message: "Invalid email address."
  }),
  phone: z.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Invalid phone number."
  }),
  address: z.string()
    .min(10, { message: "Must be 10 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" }),
  panNumber: z.string().refine((val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
    message: "Invalid pan number."
  }),
  gstNumber: z.string().refine((val) => /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(val), {
    message: "Invalid gst number."
  }),
  gstPercentage: z.number()
    .min(0, { message: "Must be greater that 0." })
    .max(100, { message: "Must be less than 100." }),
  companyLogo: z.string().optional()
})

export const userSchema = z.object({
  personalDetails: personalDetailsSchema,
  companyDetails: companyDetailsSchema,
})

export type User = z.infer<typeof userSchema>
export type PersonalDetails = z.infer<typeof personalDetailsSchema>
export type CompanyDetails = z.infer<typeof companyDetailsSchema>