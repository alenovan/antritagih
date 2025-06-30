"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { deleteRoleAction } from "@/actions/user-management/role";
import RoleForm from "@/components/form/user-management/role";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";

export default function RoleView({
  roles,
}: {
  roles: GeneralAPIFetchResponse<Role[]>;
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    name: string;
  } | null>(null);

  return (
    <PageContainer title="Role" onCreate={() => setIsOpen(true)}>
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
              const res = await deleteRoleAction(id);

              if (!res.success) return toast.error(res.message);

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
        data={roles.data}
        meta={roles.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update Role" : "Create Role"}
        description={
          initialData
            ? "Update a role to the system"
            : "Role a new role to the system"
        }
        form={
          <RoleForm
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
