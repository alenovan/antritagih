import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { formatIDR } from "@/utils/currency";
import { Text } from "lucide-react";

export const generateColumns = ({
  hasPermission,
  onEditClick,
  onDeleteClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onEditClick: (data: PriceChannel) => void;
  onDeleteClick: (id: number) => void;
}) => {
  const columns: ColumnDef<PriceChannel>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
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
      accessorKey: "fee",
      header: "Fee",
      cell: ({ row }) => <span>{formatIDR(row.getValue("fee"))}</span>,
    },
    {
      accessorKey: "effective_start_date",
      header: "Effective Start Date",
      cell: ({ row }) => (
        <span>{format(row.getValue("effective_start_date"), "PPP")}</span>
      ),
    },
    {
      accessorKey: "effective_end_date",
      header: "Effective End Date",
      cell: ({ row }) => (
        <span>{format(row.getValue("effective_end_date"), "PPP")}</span>
      ),
    },
    {
      id: "actions",
      accessorKey: "action",
      header: "Actions",
      meta: { className: "w-[200px] text-center" },
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => onEditClick(row.original)}
            size="sm"
            className=""
          >
            Edit
          </Button>

          <Button
            onClick={() => onDeleteClick(row.original.id)}
            size="sm"
            className="bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return columns;
};
