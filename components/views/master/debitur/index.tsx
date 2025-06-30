"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useConfirmationDialog } from "@/components/ui/site/confirmation-dialog";
import { useState } from "react";
import DebiturForm from "@/components/form/master/debitur";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";
import { format } from "date-fns";
import { formatIDR } from "@/utils/currency";

export default function DebiturView({
  debiturs,
}: {
  debiturs: GeneralAPIFetchResponse<Debitur[]>;
}) {
  const { hasPermission } = useAuthorization();
  const { confirm } = useConfirmationDialog();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Debitur | null>(null);

  return (
    <PageContainer title="Debitur">
      <DataTable
        columns={generateColumns({
          hasPermission,
          onViewClick: (rowData) => {
            setInitialData(rowData);
            setIsOpen(true);
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
            : "Debitur a new debitur to the system"
        }
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
                      ? format(initialData.due_date, "PPP")
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
                      ? format(initialData.last_paid_date, "PPP")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Last Paid Due Date</td>
                  <td className="p-2">
                    {initialData?.last_paid_due_date
                      ? format(initialData.last_paid_due_date, "PPP")
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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </PageContainer>
  );
}
