import { auth } from "@/lib/auth";
import { getPriceChannels } from "@/services/master/price-channel";
import PriceChannelView from "@/components/views/master/price-channel";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PriceChannelPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <PriceChannelData />
    </Suspense>
  );
}

async function PriceChannelData() {
  const session = await auth();

  const [priceChannels] = await Promise.all([
    getPriceChannels({ token: session?.user?.id as string }),
  ]);

  return <PriceChannelView priceChannels={priceChannels.data} />;
}
