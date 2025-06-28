import { auth } from "@/lib/auth";
import { getAgentCallActivitys } from "@/services/transaction/agent-call-activity";
import AgentCallActivityView from "@/components/views/transaction/agent-call-activity";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function AgentCallActivityPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <AgentCallActivityData />
    </Suspense>
  );
}

async function AgentCallActivityData() {
  const session = await auth();

  const [agentCallActivitys] = await Promise.all([
    getAgentCallActivitys({ token: session?.user?.id as string }),
  ]);

  return <AgentCallActivityView agentCallActivitys={agentCallActivitys.data} />;
}
