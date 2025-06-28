import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const generateColumns = ({
  hasPermission,
  onViewClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onViewClick: (data: CheckDebitur) => void;
}) => {
  const columns: ColumnDef<CheckDebitur>[] = [
    {
      accessorKey: "identiy_number",
      header: "Identity Number",
      cell: ({ row }) => <span>{row.getValue("identiy_number")}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
      accessorKey: "mobile_phone",
      header: "Mobile Phone",
      cell: ({ row }) => <span>{row.getValue("mobile_phone")}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <span>{row.getValue("gender")}</span>,
    },
    {
      accessorKey: "mariage_status",
      header: "Mariage Status",
      cell: ({ row }) => <span>{row.getValue("mariage_status")}</span>,
    },
    {
      accessorKey: "profession",
      header: "Profession",
      cell: ({ row }) => <span>{row.getValue("profession")}</span>,
    },
    {
      accessorKey: "spouse_name",
      header: "Spouse Name",
      cell: ({ row }) => <span>{row.getValue("spouse_name")}</span>,
    },
    {
      accessorKey: "emergency_contact",
      header: "Emergency Contact",
      cell: ({ row }) => <span>{row.getValue("emergency_contact")}</span>,
    },
    {
      accessorKey: "emergency_phone1",
      header: "Emergency Phone",
      cell: ({ row }) => (
        <span>
          {row.getValue("emergency_phone1")}
          <br />
          {row.getValue("emergency_phone2")}
        </span>
      ),
    },
    {
      accessorKey: "company_name",
      header: "Company Name",
      cell: ({ row }) => <span>{row.getValue("company_name")}</span>,
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
