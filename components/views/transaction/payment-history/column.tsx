import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { formatIDR } from "@/utils/currency";
import { Text } from "lucide-react";
import { id as ID } from "date-fns/locale";

export const generateColumns = ({
  hasPermission,
  onViewClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onViewClick: (data: PaymentHistory) => void;
}) => {
  const columns: ColumnDef<PaymentHistory>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
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
      accessorKey: "debtor_name",
      header: "Debitur Name",
      id: "debtor_name",
      cell: ({ row }) => <span>{row.getValue("debtor_name")}</span>,
      meta: {
        placeholder: "Search debitur name",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "date_v1",
      header: "Date",
      cell: ({ row }) => (
        <span>{format(row.getValue("date_v1"), "PPP", { locale: ID })}</span>
      ),
    },
    {
      accessorKey: "date_v2",
      header: "Date 2",
      cell: ({ row }) => (
        <span>{format(row.getValue("date_v2"), "PPP", { locale: ID })}</span>
      ),
    },
    {
      accessorKey: "nominal_v1",
      header: "Nominal",
      cell: ({ row }) => <span>{formatIDR(row.getValue("nominal_v1"))}</span>,
    },
    {
      accessorKey: "nominal_v2",
      header: "Nominal 2",
      cell: ({ row }) => <span>{formatIDR(row.getValue("nominal_v2"))}</span>,
    },
    {
      accessorKey: "fee_amount",
      header: "Fee Amount",
      cell: ({ row }) => <span>{formatIDR(row.getValue("fee_amount"))}</span>,
    },
    {
      accessorKey: "updated_note",
      header: "Note",
      cell: ({ row }) => <span>{row.getValue("updated_note") || "-"}</span>,
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
