import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react"

export const salutations = [
  { label: "Mr", value: "mr" },
  { label: "Mrs", value: "mrs" },
  { label: "Ms", value: "ms" },
]

export const statuses = [
  { 
    label: "Pending",
    value: "PENDING",
    icon: CircleDashed
  },
  { 
    label: "In progress",
    value: "IN_PROGRESS",
    icon: CircleDot
  },
  { 
    label: "Completed",
    value: "COMPLETED",
    icon: CheckCircle2
  }
]