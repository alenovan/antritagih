import { auth } from "@/lib/auth";
import { getRoles } from "@/services/user-management/role";
import RoleView from "@/components/views/user-management/role";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function RolePage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <RoleData />
    </Suspense>
  );
}

async function RoleData() {
  const session = await auth();

  const [roles] = await Promise.all([
    getRoles({ token: session?.user?.token as string }),
  ]);

  return <RoleView roles={roles} />;
}
