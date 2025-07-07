"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { deletePriceChannelAction } from "@/actions/master/price-channel";
import PriceChannelForm from "@/components/form/master/price-channel";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";

export default function PriceChannelView({
  priceChannels,
}: {
  priceChannels: GeneralAPIFetchResponse<PriceChannel[]>;
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: number;
    channel: string;
    fee: number;
    effective_start_date: Date;
    effective_end_date: Date;
  } | null>(null);

  return (
    <PageContainer title="Price Channel" onCreate={() => setIsOpen(true)}>
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
              const res = await deletePriceChannelAction(id);

              if (!res.status) return toast.error(res.message);

              return toast.success(res.message);
            }
          },
          onEditClick: (rowData) => {
            setInitialData({
              id: rowData.id,
              channel: rowData.channel,
              fee: rowData.fee,
              effective_start_date: rowData.effective_start_date,
              effective_end_date: rowData.effective_end_date,
            });
            setIsOpen(true);
          },
        })}
        data={priceChannels.data}
        meta={priceChannels.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update Price Channel" : "Create Price Channel"}
        description={
          initialData
            ? "Update a price channel to the system"
            : "Create a new price channel to the system"
        }
        form={
          <PriceChannelForm
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
