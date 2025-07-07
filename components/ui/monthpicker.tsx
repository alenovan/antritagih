import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const years = Array.from({ length: 30 }, (_, i) => 2000 + i); // 2000–2029

type MonthPickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function MonthPicker({ value, onChange }: MonthPickerProps) {
  const handleChange = (monthIndex: number, year: number) => {
    const newDate = new Date(year, monthIndex, 1);
    onChange(newDate);
  };

  return (
    <div className="mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {value ? format(value, "MMMM yyyy") : "Pilih Bulan"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="center">
          <div className="flex gap-2">
            <select
              className="border rounded px-2 py-1"
              value={value?.getMonth() ?? ""}
              onChange={(e) => {
                const month = parseInt(e.target.value);
                const year = value?.getFullYear() ?? new Date().getFullYear();
                handleChange(month, year);
              }}
            >
              <option value="" disabled>
                Pilih Bulan
              </option>
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-2 py-1"
              value={value?.getFullYear() ?? ""}
              onChange={(e) => {
                const year = parseInt(e.target.value);
                const month = value?.getMonth() ?? 0;
                handleChange(month, year);
              }}
            >
              <option value="" disabled>
                Pilih Tahun
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
