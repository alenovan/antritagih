"use client";

import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { useState } from "react";
// To Do
// import { deleteUploadAction } from "@/actions/user-management/upload";
import UploadForm from "@/components/form/transaction/upload";
import PageContainer from "@/components/partials/container/page-container";

export default function UploadViewDetail({ uploads }: { uploads: Upload[] }) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTemplate, setIsOpenTemplate] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    type: string;
  } | null>(null);

  return (
    <PageContainer title="Upload">
      <div className="p-10">
        <UploadForm
          initialData={initialData}
          mode={"create"}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </PageContainer>
  );
}
