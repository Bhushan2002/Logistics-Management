"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Feb",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Mar",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Apr",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "May",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Jun",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Jul",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Aug",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Sep",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Oct",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Nov",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
  {
    name: "Dec",
    income: Math.floor(Math.random() * 100) + 0,
    expense: Math.floor(Math.random() * 100) + 0,
  },
]

type IncomeExpenseGraphProps = {
  graphData: Record<string, string | number>[]
}

export function IncomeExpenseGraph(props: IncomeExpenseGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={props.graphData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey="income" fill="#65B741" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" fill="#EF4040" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}