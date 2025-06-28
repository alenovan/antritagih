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
import CustomTooltip from "./custom-tooltip";

const GmvReport = ({ data }: { data: GMVReport[] }) => {
  const { theme: mode } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart height={300} data={data}>
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
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="gmv" fill={colors.info} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GmvReport;
