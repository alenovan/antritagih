import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { formatIDR } from "@/utils/currency";
import { MoreVertical, Text } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { id as ID } from "date-fns/locale";

export const generateColumns = ({
  hasPermission,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onViewClick: (data: Debitur) => void;
  onEditClick: (data: Debitur) => void;
  onDeleteClick: (id: number) => void;
}) => {
  const locale = useLocale();

  const columns: ColumnDef<Debitur>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Customer Name",
      id: "name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
      meta: {
        placeholder: "Search customer name",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
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
      cell: ({ row }) => <span>{row.original.account_number}</span>,
    },
    {
      accessorKey: "identity_number",
      header: "Identity Number",
      id: "identity_number",
      cell: ({ row }) => <span>{row.original.identity_number}</span>,
      meta: {
        placeholder: "Search identity number",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "product_type",
      header: "Product Type",
      id: "product_type",
      cell: ({ row }) => <span>{row.getValue("product_type")}</span>,
      meta: {
        placeholder: "Search product type",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "installment_amount",
      header: "Installment Amount",
      cell: ({ row }) => (
        <span>{formatIDR(row.getValue("installment_amount"))}</span>
      ),
    },
    {
      accessorKey: "remaining_debt",
      header: "Remaining Debt",
      cell: ({ row }) => (
        <span>{formatIDR(row.getValue("remaining_debt"))}</span>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => (
        <span>
          {row.getValue("due_date")
            ? format(row.getValue("due_date"), "PPP", { locale: ID })
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "call_status",
      header: "Call Status",
      id: "call_status",
      cell: ({ row }) => <span>{row.getValue("call_status")}</span>,
      meta: {
        placeholder: "Search call status",
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <MoreVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <a
                  href={`/${locale}/transactional/agent-call-activity?account_number=${row.original.account_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  Agent Call Activity
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={`/${locale}/transactional/rekap-payment-data?account_number=${row.original.account_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  Rekap Payment
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={`/${locale}/transactional/upload/detail?option=debitur&clientid=${row.original.client_id}&clientname=${row.original.name}`}
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  Upload Data
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={`/${locale}/master/debitur/additional?debitur_id=${row.original.id}`}
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  Additional Data
                </a>
              </DropdownMenuItem>
              {(hasPermission("debitur", "update") ||
                hasPermission("debitur", "delete")) && (
                <DropdownMenuSeparator />
              )}
              <DropdownMenuItem asChild>
                {hasPermission("debitur", "update") && (
                  <div
                    className="cursor-pointer"
                    onClick={() => onEditClick(row.original)}
                  >
                    Edit
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {hasPermission("debitur", "delete") && (
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={() => onDeleteClick(row.original.id)}
                  >
                    Delete
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return columns;
};
