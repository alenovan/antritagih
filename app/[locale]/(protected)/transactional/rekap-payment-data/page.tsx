import { auth } from "@/lib/auth";
import { getPaymentHistorys } from "@/services/transaction/payment-history";
import PaymentHistoryView from "@/components/views/transaction/payment-history";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PaymentHistoryPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <PaymentHistoryData />
    </Suspense>
  );
}

async function PaymentHistoryData() {
  const session = await auth();

  const [paymentHistorys] = await Promise.all([
    getPaymentHistorys({ token: session?.user?.id as string }),
  ]);

  return <PaymentHistoryView paymentHistorys={paymentHistorys.data} />;
}
