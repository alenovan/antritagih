"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { useEffect, useState } from "react";
import DebiturForm from "@/components/form/master/debitur";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";
import { format } from "date-fns";
import { formatIDR } from "@/utils/currency";
import {
  deleteDebiturAction,
  getDebiturAction,
} from "@/actions/master/debitur";
import { toast } from "sonner";
import { id as ID } from "date-fns/locale";
import useSWR from "swr";

export default function DebiturView({
  debiturs,
  clients,
}: {
  debiturs: GeneralAPIFetchResponse<Debitur[]>;
  clients: GeneralAPIFetchResponse<Client[]>;
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [initialData, setInitialData] = useState<Debitur | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [randId, setRandId] = useState<string>("");
  const [type, setType] = useState<"update" | "detail">("detail");

  const { data } = useSWR<GeneralAPIFetchResponse<Debitur> | null>(
    [randId],
    () => {
      if (id) return getDebiturAction(id);
      return null;
    },
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setInitialData(data.data);
      if (type === "update") setIsOpen(true);
      if (type === "detail") setIsOpenDetail(true);
    }
  }, [data]);

  return (
    <PageContainer title="Debitur" onCreate={() => setIsOpen(true)}>
      <DataTable
        columns={generateColumns({
          hasPermission,
          onViewClick: (rowData) => {
            setId(rowData.id);
            setRandId(Math.random().toString(36).substr(2, 9));
            setType("detail");
          },
          onEditClick: (rowData) => {
            setId(rowData.id);
            setRandId(Math.random().toString(36).substr(2, 9));
            setType("update");
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
              const res = await deleteDebiturAction(id);

              if (!res.status) return toast.error(res.message);

              return toast.success(res.message);
            }
          },
        })}
        data={debiturs.data}
        meta={debiturs.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={initialData ? "Update Debitur" : "Create Debitur"}
        description={
          initialData
            ? "Update a debitur to the system"
            : "Create a new debitur to the system"
        }
        form={
          <DebiturForm
            initialData={initialData}
            mode={initialData ? "update" : "create"}
            onClose={() => setIsOpen(false)}
            clients={clients.data}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={"Detail Debitur"}
        description={"Detail a debitur information"}
        form={
          <div className="overflow-y-auto max-h-[70vh]">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Name</td>
                  <td className="p-2">{initialData?.name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Account Number</td>
                  <td className="p-2">{initialData?.account_number}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Identity Number</td>
                  <td className="p-2">{initialData?.identity_number}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Product Type</td>
                  <td className="p-2">{initialData?.product_type}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Fee</td>
                  <td className="p-2">{formatIDR(initialData?.fee)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Installment Amount</td>
                  <td className="p-2">
                    {formatIDR(initialData?.installment_amount)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Remaining Debt</td>
                  <td className="p-2">
                    {formatIDR(initialData?.remaining_debt)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Due Date</td>
                  <td className="p-2">
                    {initialData?.due_date
                      ? format(initialData.due_date, "PPP", { locale: ID })
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Status</td>
                  <td className="p-2">{initialData?.call_status}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Client Name</td>
                  <td className="p-2">{initialData?.client_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Branch Location</td>
                  <td className="p-2">{initialData?.branch_location}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Address</td>
                  <td className="p-2">{initialData?.address}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Zone</td>
                  <td className="p-2">{initialData?.zone}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Tenure</td>
                  <td className="p-2">{initialData?.tenur} months</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Spouse Name</td>
                  <td className="p-2">{initialData?.spouse_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Company Name</td>
                  <td className="p-2">{initialData?.company_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Asset Description</td>
                  <td className="p-2">{initialData?.asset_desc}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Asset Category</td>
                  <td className="p-2">{initialData?.asset_category}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">License Plate</td>
                  <td className="p-2">{initialData?.license_plate}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Manufacturing Year</td>
                  <td className="p-2">{initialData?.manufacturing_year}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Next Installment Number</td>
                  <td className="p-2">
                    {initialData?.next_installment_number}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Last Paid Date</td>
                  <td className="p-2">
                    {initialData?.last_paid_date
                      ? format(initialData.last_paid_date, "PPP", {
                          locale: ID,
                        })
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Last Paid Due Date</td>
                  <td className="p-2">
                    {initialData?.last_paid_due_date
                      ? format(initialData.last_paid_due_date, "PPP", {
                          locale: ID,
                        })
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Total Debt</td>
                  <td className="p-2">{formatIDR(initialData?.total_debt)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Status (Numerical)</td>
                  <td className="p-2">{initialData?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
        isOpen={isOpenDetail}
        setIsOpen={setIsOpenDetail}
      />
    </PageContainer>
  );
}
