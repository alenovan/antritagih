"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { data, PaymentData } from "./data";
import TablePagination from "./table-pagination";
import AccountDetailsModal from "./modal";
import { Button } from "@/components/ui/button";
import PaymentDetailsModal from "./modal";

const PaymentHistory = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<PaymentData | null>(null);

  // Open modal with data
  const handleOpenPopup = (data: PaymentData) => {
    setModalData(data); // Set the selected row data
    setIsModalOpen(true);
  };

  const columns: ColumnDef<PaymentData>[] = [
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
      cell: ({ row }) => <span>{row.getValue("nominal")}</span>, // Format as currency
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => <span>{row.getValue("due_date")}</span>,
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
      cell: ({ row }) => (
        <Button onClick={() => handleOpenPopup(row.original)} size="sm">
          View Details
        </Button>
      ),
    },
  ];
  // Initialize the table with hooks
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 px-5">
        <div className="flex-1 text-xl font-medium text-default-900">
          Rekap Payment Data
        </div>
        <div className="flex-none">
          <Input
            placeholder="Filter Status..."
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
            }
            className="max-w-sm "
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} />

      {/* Modal */}
      <PaymentDetailsModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </div>
  );
};

export default PaymentHistory;
