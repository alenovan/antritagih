import { auth } from "@/lib/auth";
import { getUsers } from "@/services/user-management/user";
import UserView from "@/components/views/user-management/user";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoles } from "@/services/user-management/role";

export default async function UserPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <UserData />
    </Suspense>
  );
}

async function UserData() {
  const session = await auth();

  const [users, roles] = await Promise.all([
    getUsers({ token: session?.user?.id as string }),
    getRoles({ token: session?.user?.id as string }),
  ]);

  return <UserView users={users.data} roles={roles.data} />;
}
