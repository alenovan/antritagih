import { auth } from "@/lib/auth";
import { getPaymentHistorys } from "@/services/transaction/payment-history";
import PaymentHistoryView from "@/components/views/transaction/payment-history";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PaymentHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <PaymentHistoryData searchParams={await searchParams} />
    </Suspense>
  );
}

async function PaymentHistoryData({
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

  const [paymentHistorys] = await Promise.all([
    getPaymentHistorys({ token: session?.user?.token as string, query }),
  ]);

  return <PaymentHistoryView paymentHistorys={paymentHistorys} />;
}
