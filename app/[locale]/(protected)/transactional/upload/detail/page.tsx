import { auth } from "@/lib/auth";
// To Do
// import { getUploads } from "@/services/user-management/upload";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UploadViewDetail from "@/components/views/transaction/upload/detail";

export default async function UploadPage() {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <UploadData />
    </Suspense>
  );
}

async function UploadData() {
  const session = await auth();
  return (
    <UploadViewDetail
      uploads={[
        {
          id: 1,
          type: "debitur",
          filename: "upload.csv",
          status: "new",
        },
        {
          id: 2,
          type: "agent_call_activity",
          filename: "upload.csv",
          status: "processing",
        },
        {
          id: 3,
          type: "rekap_payment",
          filename: "upload.csv",
          status: "failed",
        },
      ]}
    />
  );
}
