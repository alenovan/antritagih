import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatIDR } from "@/utils/currency";
import { Text } from "lucide-react";

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
      id: "client_name",
      cell: ({ row }) => <span>{row.getValue("client_name")}</span>,
      meta: {
        placeholder: "Search client name",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      id: "customer_name",
      cell: ({ row }) => <span>{row.getValue("customer_name")}</span>,
      meta: {
        placeholder: "Search customer name",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "account_number",
      header: "Account Number",
      id: "account_number",
      cell: ({ row }) => <span>{row.getValue("account_number")}</span>,
      meta: {
        placeholder: "Search account number",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "jumlah_tagihan",
      header: "Jumlah tagihan",
      cell: ({ row }) => (
        <span>{formatIDR(row.getValue("jumlah_tagihan"))}</span>
      ),
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
      id: "phone_number",
      cell: ({ row }) => <span>{row.getValue("phone_number")}</span>,
      meta: {
        placeholder: "Search phone number",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "account_status",
      header: "Account Status",
      cell: ({ row }) => <span>{row.getValue("account_status")}</span>,
    },
    {
      accessorKey: "channel",
      header: "Channel",
      id: "channel",
      cell: ({ row }) => <span>{row.getValue("channel")}</span>,
      meta: {
        placeholder: "Search channel",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
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
