import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatIDR } from "@/utils/currency";

export const generateColumns = ({
  hasPermission,
  onViewClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onViewClick: (data: AgentCallActivity) => void;
}) => {
  const columns: ColumnDef<AgentCallActivity>[] = [
    {
      accessorKey: "client_name",
      header: "Client Name",
      cell: ({ row }) => <span>{row.getValue("client_name")}</span>,
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      cell: ({ row }) => <span>{row.getValue("customer_name")}</span>,
    },
    {
      accessorKey: "account_number",
      header: "Account Number",
      cell: ({ row }) => <span>{row.getValue("account_number")}</span>,
    },
    {
      accessorKey: "jumlah_tagihan",
      header: "Jumlah tagihan",
      cell: ({ row }) => <span>{formatIDR(row.getValue("jumlah_tagihan"))}</span>,
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
      cell: ({ row }) => <span>{row.getValue("phone_number")}</span>,
    },
    {
      accessorKey: "account_status",
      header: "Account Status",
      cell: ({ row }) => <span>{row.getValue("account_status")}</span>,
    },
    {
      accessorKey: "channel",
      header: "Channel",
      cell: ({ row }) => <span>{row.getValue("channel")}</span>,
    },
    {
      id: "actions",
      accessorKey: "action",
      header: "Actions",
      meta: { className: "w-[200px] text-center" },
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => onViewClick(row.original)}
            size="sm"
            className=""
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return columns;
};
