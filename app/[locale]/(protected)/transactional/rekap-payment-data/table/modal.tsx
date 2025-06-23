// modal.tsx

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming Dialog is available from this location
import { Button } from "@/components/ui/button"; // Assuming Button is in this location
import { PaymentData } from "./data"; // Import PaymentData type

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: PaymentData | null;
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  if (!data) return null; // If there's no data, don't render the modal

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogContent className="max-w-3xl mx-auto my-8 bg-white p-6 rounded-lg shadow-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Payment Details
          </DialogTitle>
        </DialogHeader>

        {/* Table for displaying key data fields */}
        <div className="overflow-y-auto max-h-[70vh]">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Client Name</td>
                <td className="p-2">{data.client_name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Account Number</td>
                <td className="p-2">{data.account_number}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Debitur Name</td>
                <td className="p-2">{data.debitur_name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Nominal</td>
                <td className="p-2">${data.nominal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Due Date</td>
                <td className="p-2">{data.due_date}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Payment Status</td>
                <td className="p-2">{data.data_status}</td>
              </tr>

              {/* Additional Information in Table */}
              <tr>
                <td className="p-2 font-semibold">Agent Name</td>
                <td className="p-2">{data.agent_name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Discount Percent</td>
                <td className="p-2">{data.discount_percent}%</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Description</td>
                <td className="p-2">{data.keterangan}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Note</td>
                <td className="p-2">{data.note}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Created At</td>
                <td className="p-2">{data.created_at}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Updated At</td>
                <td className="p-2">{data.updated_at}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onRequestClose}
            className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsModal;
