// app/transaction/proviling/[id]/page.tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProvilingDetail from "@/components/views/transaction/proviling/detail/Index";
import { getCheckDebiturs } from "@/services/master/proviling";
import { auth } from "@/lib/auth";

interface ProvilingDetailPageProps {
  params: { id: string };
}

export default async function ProvilingDetailPage({
  params,
}: ProvilingDetailPageProps) {
  const session = await auth();
  const { id } = params;

  const provilingDetail = await getCheckDebiturs({
    token: session?.user?.id as string,
    identityNumber: id || "",
  });

  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <ProvilingDetail proviling={provilingDetail.data[0]} />
    </Suspense>
  );
}
