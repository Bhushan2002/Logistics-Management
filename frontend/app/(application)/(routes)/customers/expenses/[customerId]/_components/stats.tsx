import { formatNumberToIndianReadble } from "@/utils/utils";
import { StatCard } from "./stat-card";

type StatsProps = {
  totalExpenseAmount: number,
  totalIncomeAmount: number
}

export function Stats(props: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Expense Amount"
        iconName="trending-down"
        iconColor="#EF4040"
        value={"Rs " + formatNumberToIndianReadble(props.totalExpenseAmount)}
        description="Total expense amount from trips"
      />
      <StatCard
        title="Total Profit"
        iconName="trending-up"
        iconColor="#65B741"
        value={"Rs " + formatNumberToIndianReadble(props.totalIncomeAmount - props.totalExpenseAmount)}
        description="Total income amount from trips"
      />
    </div>
  )
}