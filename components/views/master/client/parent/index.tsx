"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { deleteClientParentAction } from "@/actions/master/client";
import ClientParentForm from "@/components/form/master/client/parent";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";

export default function ClientParentView({
  clients,
}: {
  clients: GeneralAPIFetchResponse<ClientParent[]>;
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    name: string;
  } | null>(null);

  return (
    <PageContainer title="Client Parent" onCreate={() => setIsOpen(true)}>
      <DataTable
        columns={generateColumns({
          hasPermission,
          onDeleteClick: async (id) => {
            const confirmed = await confirm({
              title: "Delete Item",
              description: "Are you sure you want to delete this item?",
              confirmText: "Yes, delete",
              cancelText: "No, keep it",
              type: "destructive",
            });

            if (confirmed) {
              const res = await deleteClientParentAction(id);

              if (!res.status) return toast.error(res.message);

              return toast.success(res.message);
            }
          },
          onEditClick: (rowData) => {
            setInitialData({
              id: rowData.id,
              name: rowData.name,
            });
            setIsOpen(true);
          },
        })}
        data={clients.data}
        meta={clients.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update Client Parent" : "Create Client Parent"}
        description={
          initialData
            ? "Update a client parent to the system"
            : "Client a new client parent to the system"
        }
        form={
          <ClientParentForm
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
