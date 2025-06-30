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
  paymentHistorys: GeneralAPIFetchResponse<PaymentHistory[]>;
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
        data={paymentHistorys.data}
        meta={paymentHistorys.meta}
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
                  <td className="p-2">{initialData?.debtor_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Date</td>
                  <td className="p-2">
                    {initialData?.date_v1
                      ? format(new Date(initialData?.date_v1 || ""), "PPP")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Date 2</td>
                  <td className="p-2">
                    {initialData?.date_v2
                      ? format(new Date(initialData?.date_v2 || ""), "PPP")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Nominal</td>
                  <td className="p-2">{initialData?.nominal_v1.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Nominal 2</td>
                  <td className="p-2">{initialData?.nominal_v2.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Fee Amount</td>
                  <td className="p-2">{initialData?.fee_amount.toFixed(2)}</td>
                </tr>

                {/* Additional Information in Table */}
                <tr>
                  <td className="p-2 font-semibold">Agent Name</td>
                  <td className="p-2">{initialData?.agent}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Discount Percent</td>
                  <td className="p-2">{initialData?.disc}%</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Description</td>
                  <td className="p-2">{initialData?.keterangan}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Note</td>
                  <td className="p-2">{initialData?.updated_note}</td>
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
