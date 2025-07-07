"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { useState } from "react";
import DebiturAdditionalForm from "@/components/form/master/debitur/additional";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";
import { deleteDebiturAdditionalAction } from "@/actions/master/debitur";
import { toast } from "sonner";

export default function DebiturAdditionalView({
  debiturAdditionals,
}: {
  debiturAdditionals: GeneralAPIFetchResponse<DebiturAdditional[]>;
}) {
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<DebiturAdditional | null>(
    null
  );

  return (
    <PageContainer title="Debitur Additional" onCreate={() => setIsOpen(true)}>
      <DataTable
        columns={generateColumns({
          onEditClick: (rowData) => {
            setInitialData(rowData);
            setIsOpen(true);
          },
          onDeleteClick: async (id) => {
            const confirmed = await confirm({
              title: "Delete Item",
              description: "Are you sure you want to delete this item?",
              confirmText: "Yes, delete",
              cancelText: "No, keep it",
              type: "destructive",
            });

            if (confirmed) {
              const res = await deleteDebiturAdditionalAction(id);

              if (!res.status) return toast.error(res.message);

              return toast.success(res.message);
            }
          },
        })}
        data={debiturAdditionals.data || []}
        meta={debiturAdditionals.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={
          initialData
            ? "Update Debitur Additional"
            : "Create Debitur Additional"
        }
        description={
          initialData
            ? "Update a debitur additional to the system"
            : "Create a new debitur additional to the system"
        }
        form={
          <DebiturAdditionalForm
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
