import { auth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getRole } from "@/services/user-management/role";
import { getPermissions } from "@/services/user-management/permission";
import RoleDetailView from "@/components/views/user-management/role/detail";

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-full rounded-xl" />}>
        <RoleDetailData id={id} />
      </Suspense>
    </>
  );
}

async function RoleDetailData({ id }: { id: string }) {
  const session = await auth();

  const [role, permissions] = await Promise.all([
    getRole({
      token: session?.user?.token as string,
      id: Number(id),
    }),
    getPermissions({
      token: session?.user?.token as string,
    }),
  ]);

  return (
    <>
      <RoleDetailView
        role={role.data}
        permissions={permissions.data}
        id={Number(id)}
      />
    </>
  );
}
