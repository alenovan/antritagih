import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "lucide-react";

export const generateColumns = ({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: (data: DebiturAdditional) => void;
  onDeleteClick: (id: number) => void;
}) => {
  const columns: ColumnDef<DebiturAdditional>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "data",
      header: "Data",
      id: "data",
      cell: ({ row }) => <span>{row.getValue("data")}</span>,
      meta: {
        placeholder: "Search data",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "source",
      header: "Source",
      id: "source",
      cell: ({ row }) => <span>{row.getValue("source")}</span>,
      meta: {
        placeholder: "Search source",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "identifier",
      header: "Identifier",
      id: "identifier",
      cell: ({ row }) => <span>{row.original.identifier}</span>,
      meta: {
        placeholder: "Search identifier",
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
