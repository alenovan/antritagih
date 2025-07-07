import { auth } from "@/lib/auth";
// To Do
// import { getUploads } from "@/services/user-management/upload";
import UploadView from "@/components/views/transaction/upload";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUploadActivity } from "@/services/transaction/agent-call-activity";

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <UploadData searchParams={await searchParams} />
    </Suspense>
  );
}

async function UploadData({
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

  const [uploadActivity] = await Promise.all([
    getUploadActivity({ token: session?.user?.token as string, query }),
  ]);

  return <UploadView uploads={uploadActivity} />;
}
