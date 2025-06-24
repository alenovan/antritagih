import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProfilingForm from "@/components/views/transaction/proviling";
import { auth } from "@/lib/auth";

export default async function DebiturPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <ProvilingData />
    </Suspense>
  );
}

async function ProvilingData() {
  const session = await auth();
  return <ProfilingForm session={session ?? undefined} />;
}
