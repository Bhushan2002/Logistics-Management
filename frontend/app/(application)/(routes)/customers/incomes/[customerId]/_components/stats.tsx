import { formatNumberToIndianReadble } from "@/utils/utils";
import { StatCard } from "./stat-card";

type StatsProps = {
  totalIncomeAmount: number,
  totalDueAmount: number
}

export function Stats(props: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Income Amount"
        iconName="indian-rupee"
        iconColor="#65B741"
        value={"Rs " + formatNumberToIndianReadble(props.totalIncomeAmount)}
        description="Total income amount from trips"
      />
      <StatCard
        title="Total Due Amount"
        iconName="alert-circle"
        iconColor="#EF4040"
        value={"Rs " +formatNumberToIndianReadble(props.totalDueAmount)}
        description="Total due amount from trips"
      />
    </div>
  )
}