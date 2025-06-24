import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const generateColumns = ({
  hasPermission,
  onViewClick,
}: {
  hasPermission: (module: string, action: string) => boolean;
  onViewClick: (data: ClientDetail) => void;
}) => {
  const columns: ColumnDef<ClientDetail>[] = [
    {
      accessorKey: "client_id",
      header: "Client ID",
      cell: ({ row }) => <span>{row.getValue("client_id")}</span>,
    },
    {
      accessorKey: "account_number",
      header: "Account Number",
      cell: ({ row }) => <span>{row.getValue("account_number")}</span>,
    },
    {
      accessorKey: "identiy_number",
      header: "Identity Number",
      cell: ({ row }) => <span>{row.getValue("identiy_number")}</span>,
    },
    {
      accessorKey: "product_type",
      header: "Product Type",
      cell: ({ row }) => <span>{row.getValue("product_type")}</span>,
    },
    {
      accessorKey: "fee",
      header: "Fee",
      cell: ({ row }) => <span>{row.getValue("fee")}</span>,
    },
    {
      accessorKey: "asset_desc",
      header: "Asset Description",
      cell: ({ row }) => <span>{row.getValue("asset_desc")}</span>,
    },
    {
      accessorKey: "asset_category",
      header: "Asset Category",
      cell: ({ row }) => <span>{row.getValue("asset_category")}</span>,
    },
    {
      accessorKey: "license_plate",
      header: "License Plate",
      cell: ({ row }) => <span>{row.getValue("license_plate")}</span>,
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => <span>{row.getValue("color")}</span>,
    },
    {
      accessorKey: "manufacturing_year",
      header: "Manufacturing Year",
      cell: ({ row }) => <span>{row.getValue("manufacturing_year")}</span>,
    },
    {
      accessorKey: "next_installment_number",
      header: "Next Installment Number",
      cell: ({ row }) => <span>{row.getValue("next_installment_number")}</span>,
    },
    {
      accessorKey: "last_paid_date",
      header: "Last Paid Date",
      cell: ({ row }) => {
        const date = row.getValue("last_paid_date");
        return date;
      },
    },
    {
      accessorKey: "last_paid_due_date",
      header: "Last Paid Due Date",
      cell: ({ row }) => {
        const date = row.getValue("last_paid_due_date");
        return date;
      },
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => {
        const date = row.getValue("due_date");
        return date;
      },
    },
    {
      accessorKey: "zone",
      header: "Zone",
      cell: ({ row }) => <span>{row.getValue("zone")}</span>,
    },
    {
      accessorKey: "tenur",
      header: "Tenure (Months)",
      cell: ({ row }) => <span>{row.getValue("tenur")}</span>,
    },
    {
      accessorKey: "branch_location",
      header: "Branch Location",
      cell: ({ row }) => <span>{row.getValue("branch_location")}</span>,
    },
    {
      accessorKey: "installment_amount",
      header: "Installment Amount",
      cell: ({ row }) => <span>{row.getValue("installment_amount")}</span>,
    },
    {
      accessorKey: "total_debt",
      header: "Total Debt",
      cell: ({ row }) => <span>{row.getValue("total_debt")}</span>,
    },
    {
      accessorKey: "remaining_debt",
      header: "Remaining Debt",
      cell: ({ row }) => <span>{row.getValue("remaining_debt")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span>{row.getValue("status") === 1 ? "Active" : "Inactive"}</span>
      ),
    },
    {
      accessorKey: "call_status",
      header: "Call Status",
      cell: ({ row }) => <span>{row.getValue("call_status")}</span>,
    },
  ];

  return columns;
};
