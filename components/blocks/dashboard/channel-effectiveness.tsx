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
import CustomTooltip from "./custom-tooltip";

const ChannelEffectiveness = ({ data }: { data: ChannelEffectiveness[] }) => {
  const { theme: mode } = useTheme();

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
        <Tooltip content={<CustomTooltip />} />
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
          dataKey="effectiveness_score"
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

export default ChannelEffectiveness;
