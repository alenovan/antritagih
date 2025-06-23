"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
// To Do
// import { deleteUploadAction } from "@/actions/user-management/upload";
import UploadForm from "@/components/form/transaction/upload";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";

export default function UploadView({ uploads }: { uploads: Upload[] }) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    type: string;
  } | null>(null);

  return (
    <PageContainer title="Upload" onCreate={() => setIsOpen(true)}>
      <DataTable
        columns={generateColumns({
          hasPermission,
          onRetryClick: async (id) => {
            const confirmed = await confirm({
              title: "Retry Item",
              description: "Are you sure you want to retry this item?",
              confirmText: "Yes, retry",
              cancelText: "No, keep it",
            });

            if (confirmed) {
              // To Do
              // const res = await deleteUploadAction(id);
              // if (!res.success) return toast.error(res.message);
              // return toast.success(res.message);
            }
          },
          onEditClick: (rowData) => {
            setInitialData({
              id: rowData.id,
              type: rowData.type,
            });
            setIsOpen(true);
          },
        })}
        data={uploads}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update Upload" : "Upload File"}
        description={
          initialData
            ? "Update a upload to the system"
            : "Create new upload to the system"
        }
        form={
          <UploadForm
            initialData={initialData}
            mode={initialData ? "update" : "create"}
            onClose={() => setIsOpen(false)}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </PageContainer>
  );
}
