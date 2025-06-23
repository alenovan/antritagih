import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const generateColumns = ({
  hasPermission,
  onEditClick,
  onDeleteClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onEditClick: (data: User) => void;
  onDeleteClick: (id: number) => void;
}) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.original.role.name}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          color={info.getValue() ? "default" : "destructive"}
          className="capitalize"
        >
          {info.getValue() ? "Active" : "Inactive"}
        </Badge>
      ),
      meta: { className: "text-center" },
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
