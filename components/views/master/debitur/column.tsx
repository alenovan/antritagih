import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const generateColumns = ({
  hasPermission,
  onViewClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onViewClick: (data: Debitur) => void;
}) => {
  const columns: ColumnDef<Debitur>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Customer Name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
      accessorKey: "account_number",
      header: "Account Number",
      cell: ({ row }) => <span>{row.getValue("account_number")}</span>,
    },
    {
      accessorKey: "product_type",
      header: "Product Type",
      cell: ({ row }) => <span>{row.getValue("product_type")}</span>,
    },
    {
      accessorKey: "installment_amount",
      header: "Installment Amount",
      cell: ({ row }) => <span>{row.getValue("installment_amount")}</span>,
    },
    {
      accessorKey: "remaining_debt",
      header: "Remaining Debt",
      cell: ({ row }) => <span>{row.getValue("remaining_debt")}</span>,
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => <span>{format(row.getValue("due_date"), "PPP")}</span>,
    },
    {
      accessorKey: "call_status",
      header: "Call Status",
      cell: ({ row }) => <span>{row.getValue("call_status")}</span>,
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
