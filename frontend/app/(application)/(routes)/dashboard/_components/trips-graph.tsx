"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type TripsGraphProps = {
  graphData: Record<string, string | number>[]
}

export function TripsGraph(props: TripsGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={props.graphData}
      >
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
        <Line
          type="monotone"
          stroke="#1640D6"
          strokeWidth={2}
          dataKey="trips"
          activeDot={{ r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  )
}