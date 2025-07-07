import { auth } from "@/lib/auth";
import { getClientParents } from "@/services/master/client";
import ClientParentView from "@/components/views/master/client/parent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ClientParentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <ClientParentData searchParams={await searchParams} />
    </Suspense>
  );
}

async function ClientParentData({
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
    getClientParents({ token: session?.user?.token as string, query }),
  ]);

  return <ClientParentView clients={clients} />;
}
