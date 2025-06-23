"use client";

import { useTheme } from "next-themes";
import { colors } from "@/lib/colors";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

const GmvReport = () => {
  const { theme: mode } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        height={300}
        data={[
          {
            month: "2025-01",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-02",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-03",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-04",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-05",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-06",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-07",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-08",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-09",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-10",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-11",
            gmv: Math.floor(Math.random() * 10000000),
          },
          {
            month: "2025-12",
            gmv: Math.floor(Math.random() * 10000000),
          },
        ]}
      >
        <CartesianGrid stroke="none" strokeDasharray="3 3" vertical={false} />

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
        <Bar dataKey="gmv" fill={colors.info} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GmvReport;
