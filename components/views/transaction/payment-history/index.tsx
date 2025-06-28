"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useState } from "react";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";
import { format } from "date-fns";

export default function PaymentHistoryView({
  paymentHistorys,
}: {
  paymentHistorys: PaymentHistory[];
}) {
  const { hasPermission } = useAuthorization();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<PaymentHistory | null>(null);

  return (
    <PageContainer title="Payment History">
      <DataTable
        columns={generateColumns({
          hasPermission,
          onViewClick: (rowData) => {
            setInitialData(rowData);
            setIsOpen(true);
          },
        })}
        data={paymentHistorys}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={"Detail Payment History"}
        description={"Detail a Payment History in the system"}
        className="md:max-w-2xl"
        form={
          <div className="overflow-y-auto max-h-[70vh]">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Client Name</td>
                  <td className="p-2">{initialData?.client_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Account Number</td>
                  <td className="p-2">{initialData?.account_number}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Debitur Name</td>
                  <td className="p-2">{initialData?.debitur_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Nominal</td>
                  <td className="p-2">${initialData?.nominal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Due Date</td>
                  <td className="p-2">
                    {initialData?.due_date
                      ? format(new Date(initialData?.due_date || ""), "PPP")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Payment Status</td>
                  <td className="p-2">{initialData?.data_status}</td>
                </tr>

                {/* Additional Information in Table */}
                <tr>
                  <td className="p-2 font-semibold">Agent Name</td>
                  <td className="p-2">{initialData?.agent_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Discount Percent</td>
                  <td className="p-2">{initialData?.discount_percent}%</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Description</td>
                  <td className="p-2">{initialData?.keterangan}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Note</td>
                  <td className="p-2">{initialData?.note}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Created At</td>
                  <td className="p-2">
                    {initialData?.created_at
                      ? format(new Date(initialData?.created_at || ""), "PPP")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Updated At</td>
                  <td className="p-2">
                    {initialData?.updated_at
                      ? format(new Date(initialData?.updated_at || ""), "PPP")
                      : "-"}
                  </td>
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
