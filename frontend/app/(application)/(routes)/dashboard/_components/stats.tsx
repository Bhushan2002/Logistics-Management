import { formatNumberToIndianReadble } from "@/utils/utils";
import { StatCard } from "./stat-card";

type StatsProps = {
  totalTrips: number;
  totalIncome: number;
  totalExpense: number;
  netProfitAndLoss: number;
}

export function Stats(props: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Trips"
        iconName="truck"
        iconColor="#1640D6"
        value={formatNumberToIndianReadble(parseInt(props.totalTrips.toFixed(2)))}
        description="Total number of trips"
      />
      <StatCard
        title="Total Income"
        iconName="trending-up"
        iconColor="#65B741"
        value={"Rs " + formatNumberToIndianReadble(parseInt(props.totalIncome.toFixed(2)))}
        description="Total income from trips"
      />
      <StatCard
        title="Total Expenses"
        iconName="trending-down"
        iconColor="#EF4040"
        value={"Rs " + formatNumberToIndianReadble(parseInt(props.totalExpense.toFixed(2)))}
        description="Total expenses from trips"
      />
      <StatCard
        title="Net P&L"
        iconName="indian-rupee"
        iconColor="#FFA447"
        value={"Rs " + formatNumberToIndianReadble(parseInt(props.netProfitAndLoss.toFixed(2)))}
        description="Net profit and loss form trips"
      />
    </div>
  )
}