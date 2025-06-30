import { auth } from "@/lib/auth";
import { getClients } from "@/services/master/client";
import ClientView from "@/components/views/master/client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ClientPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <ClientData searchParams={await searchParams} />
    </Suspense>
  );
}

async function ClientData({
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

  const [clients] = await Promise.all([
    getClients({ token: session?.user?.token as string, query }),
  ]);

  return <ClientView clients={clients} />;
}
