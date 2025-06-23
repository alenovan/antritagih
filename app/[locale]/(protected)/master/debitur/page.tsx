import { auth } from "@/lib/auth";
import { getDebiturs } from "@/services/master/debitur";
import DebiturView from "@/components/views/master/debitur";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DebiturPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <DebiturData />
    </Suspense>
  );
}

async function DebiturData() {
  const session = await auth();

  const [debiturs] = await Promise.all([
    getDebiturs({ token: session?.user?.id as string }),
  ]);

  return <DebiturView debiturs={debiturs.data} />;
}
