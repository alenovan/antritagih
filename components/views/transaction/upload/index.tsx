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
import { Button } from "@/components/ui/button";
import Download from "@/components/form/transaction/upload/download";

export default function UploadView({ uploads }: { uploads: Upload[] }) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTemplate, setIsOpenTemplate] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    type: string;
  } | null>(null);

  return (
    <PageContainer
      title="Upload"
      onCreate={() => setIsOpen(true)}
      custom={
        <Button size="sm" onClick={() => setIsOpenTemplate(true)}>
          Download Template
        </Button>
      }
    >
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
        title={"Upload File"}
        description={"Upload a file to the system"}
        className="md:max-w-xl"
        form={
          <UploadForm
            initialData={initialData}
            mode={"create"}
            onClose={() => setIsOpen(false)}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ActionDialog
        title={"Download Template"}
        description={"Download the template to upload the file"}
        isOpen={isOpenTemplate}
        setIsOpen={setIsOpenTemplate}
        className="md:max-w-xl"
        form={<Download />}
      />
    </PageContainer>
  );
}
