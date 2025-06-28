import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CheckDebiturView from "@/components/views/transaction/proviling";
import { getCheckDebiturs } from "@/services/transaction/check-debitur";

export default async function CheckDebiturPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | number | boolean | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <CheckDebiturData searchParams={await searchParams} />
    </Suspense>
  );
}

async function CheckDebiturData({
  searchParams,
}: {
  searchParams: { [key: string]: string | number | boolean | undefined };
}) {
  const session = await auth();
  const query = {
    ...searchParams,
  };
  let checkDebiturs;

  if (Object.keys(query).length > 0) {
    [checkDebiturs] = await Promise.all([
      getCheckDebiturs({
        token: session?.user?.id as string,
        query: query || undefined,
      }),
    ]);
  } else {
    checkDebiturs = { data: [] };
  }

  return <CheckDebiturView checkDebiturs={checkDebiturs.data} />;
}
