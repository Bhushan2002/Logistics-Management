import { formatNumberToIndianReadble } from "@/utils/utils";
import { StatCard } from "./stat-card";

type StatsProps = {
  totalAmount: number,
}

export function Stats(props: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Expense"
        iconName="trending-down"
        iconColor="#EF4040"
        value={"Rs " + formatNumberToIndianReadble(props.totalAmount)}
        description="Total expense amount from trips"
      />
    </div>
  )
}