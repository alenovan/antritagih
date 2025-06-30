import { auth } from "@/lib/auth";
import { getAgentCallActivitys } from "@/services/transaction/agent-call-activity";
import AgentCallActivityView from "@/components/views/transaction/agent-call-activity";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function AgentCallActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <AgentCallActivityData searchParams={await searchParams} />
    </Suspense>
  );
}

async function AgentCallActivityData({
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

  const [agentCallActivitys] = await Promise.all([
    getAgentCallActivitys({ token: session?.user?.token as string, query }),
  ]);

  return <AgentCallActivityView agentCallActivitys={agentCallActivitys} />;
}
