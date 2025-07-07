import { auth } from "@/lib/auth";
import { getDebiturAdditionals } from "@/services/master/debitur";
import DebiturAdditionalView from "@/components/views/master/debitur/additional";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DebiturAdditionalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <DebiturAdditionalData searchParams={await searchParams} />
    </Suspense>
  );
}

async function DebiturAdditionalData({
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

  const [debiturAdditionals] = await Promise.all([
    getDebiturAdditionals({ token: session?.user?.token as string, query }),
  ]);

  return <DebiturAdditionalView debiturAdditionals={debiturAdditionals} />;
}
