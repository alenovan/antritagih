import { auth } from "@/lib/auth";
import { getClients } from "@/services/master/client";
import ClientView from "@/components/views/master/client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ClientPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <ClientData />
    </Suspense>
  );
}

async function ClientData() {
  const session = await auth();

  const [clients] = await Promise.all([
    getClients({ token: session?.user?.id as string }),
  ]);

  return <ClientView clients={clients.data} />;
}
