"use client";

import { useTheme } from "next-themes";
import { colors } from "@/lib/colors";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChannelCost = () => {
  const { theme: mode } = useTheme();

  const data = [
    {
      month: "2025-01",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-02",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-03",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-04",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-05",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-06",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-07",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-08",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-09",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-10",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-11",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
    {
      month: "2025-12",
      channel: "Whatsapp",
      cost: Math.floor(Math.random() * 10000000),
    },
  ];

  return (
    <ResponsiveContainer height={300}>
      <LineChart height={300} data={data}>
        <CartesianGrid stroke="none" strokeDasharray="1 1" vertical={false} />

        <XAxis
          dataKey="month"
          tick={{
            fill:
              mode === "light" ? colors["default-600"] : colors["default-300"],
            fontSize: "12px",
          }}
          tickLine={false}
          stroke="none"
          axisLine={false}
        />
        <YAxis
          tick={{
            fill:
              mode === "light" ? colors["default-600"] : colors["default-300"],
            fontSize: "12px",
          }}
          tickLine={false}
          stroke="none"
        />
        <Tooltip
          content={({ active, payload }: any) => {
            if (active && payload) {
              return (
                <div className="bg-slate-900 text-primary-foreground p-3 rounded-md space-x-2 rtl:space-x-reverse ">
                  <span>{`${payload[0].name}`}</span>
                  <span>:</span>
                  <span>{`${payload[0].value}`}</span>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="channel"
          stroke={colors.primary}
          dot={{
            stroke: colors.primary,
            strokeWidth: 1,
          }}
        />
        <Line
          type="monotone"
          dataKey="cost"
          stroke={colors.primary}
          dot={{
            stroke: colors.info,
            strokeWidth: 1,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChannelCost;
