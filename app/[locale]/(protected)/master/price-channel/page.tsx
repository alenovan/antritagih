import { auth } from "@/lib/auth";
import { getPriceChannels } from "@/services/master/price-channel";
import PriceChannelView from "@/components/views/master/price-channel";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PriceChannelPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <PriceChannelData searchParams={await searchParams} />
    </Suspense>
  );
}

async function PriceChannelData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const query = {
    ...searchParams,
    page: parseInt((searchParams.page as string) || "1", 10),
    per_page: parseInt((searchParams.per_page as string) || "10", 10),
  };

  const [priceChannels] = await Promise.all([
    getPriceChannels({ token: session?.user?.token as string, query }),
  ]);

  return <PriceChannelView priceChannels={priceChannels} />;
}
