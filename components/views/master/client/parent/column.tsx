import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "lucide-react";

export const generateColumns = ({
  hasPermission,
  onEditClick,
  onDeleteClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onEditClick: (data: ClientParent) => void;
  onDeleteClick: (id: number) => void;
}) => {
  const columns: ColumnDef<ClientParent>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      id: "name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
      meta: {
        placeholder: "Search name",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      id: "name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
      meta: {
        placeholder: "Search name",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      accessorKey: "action",
      header: "Actions",
      meta: {
        className: cn(
          "w-[200px] text-center",
          hasPermission("client", "update") || hasPermission("client", "delete")
            ? ""
            : "hidden"
        ),
      },
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          {hasPermission("client", "update") && (
            <Button
              onClick={() => onEditClick(row.original)}
              size="sm"
              className=""
            >
              Edit
            </Button>
          )}

          {hasPermission("client", "delete") && (
            <Button
              onClick={() => onDeleteClick(row.original.id)}
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
