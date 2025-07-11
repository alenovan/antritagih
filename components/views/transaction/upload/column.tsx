import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const generateColumns = ({
  hasPermission,
  onDeleteClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onEditClick: (data: Upload) => void;
  onDeleteClick: (id: number) => void;
}) => {
  const columns: ColumnDef<Upload>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
      accessorKey: "identifier",
      header: "Identifier",
      cell: ({ row }) => (
        <span>
          {(row.getValue("identifier") as string).replaceAll("_", " ")}
        </span>
      ),
    },
    {
      accessorKey: "filename",
      header: "Filename",
      cell: ({ row }) => (
        <span className="normal-case">{row.getValue("filename")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <Badge
          color={
            info.getValue() === "success"
              ? "success"
              : info.getValue() === "processing"
              ? "warning"
              : info.getValue() === "new" 
              ? "info"
              : "destructive"
          }
          className="capitalize"
        >
          {info.getValue() as string}
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
          <Button onClick={() => onDeleteClick(row.original.id)} size="sm">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return columns;
};
