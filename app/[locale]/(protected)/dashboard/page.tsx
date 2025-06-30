import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardView from "@/components/views/dashboard";
import {
  getChannelCosts,
  getChannelEffectiveness,
  getGMVReports,
  getNettRevenueReports,
} from "@/services/report";

export default async function DashboardPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <DashboardData />
    </Suspense>
  );
}

async function DashboardData() {
  const session = await auth();

  const [gmvReports, nettRevenueReports, channelCosts, channelEffectiveness] =
    await Promise.all([
      getGMVReports({ token: session?.user?.token as string }),
      getNettRevenueReports({ token: session?.user?.token as string }),
      getChannelCosts({ token: session?.user?.token as string }),
      getChannelEffectiveness({ token: session?.user?.token as string }),
    ]);

  return (
    <DashboardView
      gmvReports={gmvReports.data}
      nettRevenueReports={nettRevenueReports.data}
      channelCosts={channelCosts.data}
      channelEffectiveness={channelEffectiveness.data}
    />
  );
}
