import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CheckDebiturView from "@/components/views/transaction/check-debitur";
import { getCheckDebiturs } from "@/services/transaction/check-debitur";

export default async function CheckDebiturPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const query = {
    ...searchParams,
    page: parseInt((searchParams.page as string) || "1", 10),
    per_page: parseInt((searchParams.per_page as string) || "10", 10),
  };
  let checkDebiturs: GeneralAPIFetchResponse<CheckDebitur[]>;

  if (Object.keys(query).length > 0) {
    [checkDebiturs] = await Promise.all([
      getCheckDebiturs({
        token: session?.user?.token as string,
        query,
      }),
    ]);
  } else {
    checkDebiturs = {
      data: [],
      meta: {
        total_records: 0,
        last_page: 0,
        per_page: 0,
        page: 0,
        next_page: 0,
        prev_page: 0,
      },
      message: "",
      status: false,
    };
  }

  return <CheckDebiturView checkDebiturs={checkDebiturs} />;
}
