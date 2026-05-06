"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", tasks: 12, connections: 18 },
  { month: "February", tasks: 19, connections: 25 },
  { month: "March", tasks: 23, connections: 31 },
  { month: "April", tasks: 17, connections: 22 },
  { month: "May", tasks: 25, connections: 35 },
  { month: "June", tasks: 31, connections: 40 },
];

const chartConfig = {
  tasks: {
    label: "Tasks Completed",
    color: "hsl(var(--primary))",
  },
  connections: {
    label: "New Connections",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function DashboardChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Activity Overview</CardTitle>
        <CardDescription>
          Your tasks and connections growth over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
            <Bar
              dataKey="connections"
              fill="var(--color-connections)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
