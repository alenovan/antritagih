"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { deleteClientAction } from "@/actions/master/client";
import ClientForm from "@/components/form/master/client/child";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";

export default function ClientView({
  clients,
  parents,
}: {
  clients: GeneralAPIFetchResponse<Client[]>;
  parents: GeneralAPIFetchResponse<ClientParent[]>;
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    name: string;
    parent_client_id: number;
  } | null>(null);

  return (
    <PageContainer title="Client" onCreate={() => setIsOpen(true)}>
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
              const res = await deleteClientAction(id);

              if (!res.status) return toast.error(res.message);

              return toast.success(res.message);
            }
          },
          onEditClick: (rowData) => {
            setInitialData({
              id: rowData.id,
              name: rowData.name,
              parent_client_id: rowData.parent_client_id,
            });
            setIsOpen(true);
          },
        })}
        data={clients.data}
        meta={clients.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update Client" : "Create Client"}
        description={
          initialData
            ? "Update a client to the system"
            : "Client a new client to the system"
        }
        form={
          <ClientForm
            initialData={initialData}
            mode={initialData ? "update" : "create"}
            onClose={() => setIsOpen(false)}
            parents={parents.data}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </PageContainer>
  );
}
