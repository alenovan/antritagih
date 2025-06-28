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
      accessorKey: "debitur_name",
      header: "Debitur Name",
      cell: ({ row }) => <span>{row.getValue("debitur_name")}</span>,
    },
    {
      accessorKey: "nominal",
      header: "Nominal",
      cell: ({ row }) => <span>{row.getValue("nominal")}</span>,
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => <span>{format(row.getValue("due_date"), "PPP")}</span>,
    },
    {
      accessorKey: "data_status",
      header: "Status",
      cell: ({ row }) => <span>{row.getValue("data_status")}</span>,
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
