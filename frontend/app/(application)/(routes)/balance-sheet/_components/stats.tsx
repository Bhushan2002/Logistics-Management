import { formatNumberToIndianReadble } from "@/utils/utils";
import { StatCard } from "./stat-card";

type StatProps = {
  stats: {
    totalCreditedAmount: number | undefined,
    totalDebitedAmount: number | undefined,
  }
}

export function Stats(props: StatProps){
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Credited Amount"
        value={"₹ " + formatNumberToIndianReadble(props.stats.totalCreditedAmount ?? 0)}
        icon="move-up"
        iconColor="text-green-500"
      />
      <StatCard
        title="Total Debited Amount"
        value={"₹ " + formatNumberToIndianReadble(props.stats.totalDebitedAmount ?? 0)}
        icon="move-down"
        iconColor="text-red-500"
      />
    </div>
  )
}