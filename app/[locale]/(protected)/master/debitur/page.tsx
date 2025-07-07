import { auth } from "@/lib/auth";
import { getDebiturs } from "@/services/master/debitur";
import DebiturView from "@/components/views/master/debitur";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getClients } from "@/services/master/client";

export default async function DebiturPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <DebiturData searchParams={await searchParams} />
    </Suspense>
  );
}

async function DebiturData({
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

  const [debiturs, clients] = await Promise.all([
    getDebiturs({ token: session?.user?.token as string, query }),
    getClients({ token: session?.user?.token as string }),
  ]);

  return <DebiturView debiturs={debiturs} clients={clients} />;
}
