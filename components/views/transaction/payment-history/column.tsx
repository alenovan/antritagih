import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
      cell: ({ row }) => <span>{row.getValue("client_name")}</span>,
    },
    {
      accessorKey: "account_number",
      header: "Account Number",
      cell: ({ row }) => <span>{row.getValue("account_number")}</span>,
    },
    {
      accessorKey: "debtor_name",
      header: "Debitur Name",
      cell: ({ row }) => <span>{row.getValue("debtor_name")}</span>,
    },
    {
      accessorKey: "date_v1",
      header: "Date",
      cell: ({ row }) => <span>{format(row.getValue("date_v1"), "PPP")}</span>,
    },
    {
      accessorKey: "date_v2",
      header: "Date 2",
      cell: ({ row }) => <span>{format(row.getValue("date_v2"), "PPP")}</span>,
    },
    {
      accessorKey: "nominal_v1",
      header: "Nominal",
      cell: ({ row }) => <span>{row.getValue("nominal_v1")}</span>,
    },
    {
      accessorKey: "nominal_v2",
      header: "Nominal 2",
      cell: ({ row }) => <span>{row.getValue("nominal_v2")}</span>,
    },
    {
      accessorKey: "fee_amount",
      header: "Fee Amount",
      cell: ({ row }) => <span>{row.getValue("fee_amount")}</span>,
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
