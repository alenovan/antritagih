"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { deleteUserAction } from "@/actions/user-management/user";
import UserForm from "@/components/form/user-management/user";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";

export default function UserView({
  users,
  roles,
}: {
  users: User[];
  roles: Role[];
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    name: string;
    email: string;
    status: boolean;
    role_id: number;
    password: string;
  } | null>(null);

  return (
    <PageContainer title="User" onCreate={() => setIsOpen(true)}>
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
              const res = await deleteUserAction(id);

              if (!res.success) return toast.error(res.message);

              return toast.success(res.message);
            }
          },
          onEditClick: (rowData) => {
            setInitialData({
              id: rowData.id,
              name: rowData.name,
              email: rowData.email,
              status: rowData.status,
              role_id: rowData.role.id,
              password: "",
            });
            setIsOpen(true);
          },
        })}
        data={users}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update User" : "Create User"}
        description={
          initialData
            ? "Update a user to the system"
            : "User a new user to the system"
        }
        form={
          <UserForm
            initialData={initialData}
            roles={roles}
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
