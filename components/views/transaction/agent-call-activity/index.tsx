"use client";

import * as React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import { useEffect, useState } from "react";
import ActionDialog from "@/components/ui/site/action-dialog";
import PageContainer from "@/components/partials/container/page-container";
import { format } from "date-fns";
import { formatIDR } from "@/utils/currency";
import { id as ID } from "date-fns/locale";
import useSWR from "swr";
import { getAgentCallActivityAction } from "@/actions/transaction/agent-call-activity";
import { useRouter } from "next/navigation";

export default function AgentCallActivityView({
  agentCallActivitys,
}: {
  agentCallActivitys: GeneralAPIFetchResponse<AgentCallActivity[]>;
}) {
  const { hasPermission } = useAuthorization();

  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<AgentCallActivity | null>(
    null
  );
  const [id, setId] = useState<number | null>(null);
  const [randId, setRandId] = useState<string>("");
  const router = useRouter();

  const { data } = useSWR<GeneralAPIFetchResponse<AgentCallActivity> | null>(
    [randId],
    () => {
      if (id) return getAgentCallActivityAction(id);
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
      setIsOpen(true);
    }
  }, [data]);

  return (
    <PageContainer
      title="Agent Call Activity"
      onUpload={() => router.push("upload/detail?option=agent-call-activity")}
    >
      <DataTable
        columns={generateColumns({
          hasPermission,
          onViewClick: (rowData) => {
            setId(rowData.id);
            setRandId(Math.random().toString(36).substr(2, 9));
          },
        })}
        data={agentCallActivitys.data}
        meta={agentCallActivitys.meta}
      />

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={"Detail Agent Call Activity"}
        description={"Detail a Agent Call Activity in the system"}
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
                  <td className="p-2 font-semibold">Virtual Account</td>
                  <td className="p-2">{initialData?.virtual_account}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Customer Name</td>
                  <td className="p-2">{initialData?.customer_name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Nominal</td>
                  <td className="p-2">
                    {formatIDR(initialData?.jumlah_tagihan)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Phone Number</td>
                  <td className="p-2">{initialData?.phone_number}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Call Reason</td>
                  <td className="p-2">{initialData?.call_reason}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Call Situation</td>
                  <td className="p-2">{initialData?.call_situation}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Call Status</td>
                  <td className="p-2">{initialData?.call_status}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Action Date</td>
                  <td className="p-2">
                    {initialData?.tgl_aksi
                      ? format(new Date(initialData?.tgl_aksi || ""), "PPP", {
                          locale: ID,
                        })
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Flags</td>
                  <td className="p-2">{initialData?.flags}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Agent</td>
                  <td className="p-2">{initialData?.agent}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Call Type</td>
                  <td className="p-2">{initialData?.call_type}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Duration of Call</td>
                  <td className="p-2">{initialData?.duration_call}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Comment</td>
                  <td className="p-2">{initialData?.comment}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Remark</td>
                  <td className="p-2">{initialData?.remark}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Account Status</td>
                  <td className="p-2">{initialData?.account_status}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Channel</td>
                  <td className="p-2">{initialData?.channel}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Channel Cost</td>
                  <td className="p-2">
                    {formatIDR(initialData?.channel_cost)}
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
