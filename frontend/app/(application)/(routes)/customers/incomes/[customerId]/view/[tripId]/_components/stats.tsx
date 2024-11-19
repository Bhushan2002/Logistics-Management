import { formatNumberToIndianReadble } from "@/utils/utils";
import { StatCard } from "./stat-card";

type StatsProps = {
  totalAmount: number,
  dueAmount: number
}

export function Stats(props: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Amount"
        iconName="indian-rupee"
        iconColor="#1640D6"
        value={"Rs " + formatNumberToIndianReadble(props.totalAmount)}
        description="Total income amount from trips"
      />
      <StatCard
        title="Due Amount"
        iconName="alert-circle"
        iconColor="#EF4040"
        value={"Rs " +formatNumberToIndianReadble(props.dueAmount)}
        description="Total due amount from trips"
      />
    </div>
  )
}