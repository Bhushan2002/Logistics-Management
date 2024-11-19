import { statuses } from "./data";

export const filters = [
  {
    column: "status",
    title: "Status",
    options: statuses.map(({ label, value }) => ({
      label,
      value
    }))
  }
]