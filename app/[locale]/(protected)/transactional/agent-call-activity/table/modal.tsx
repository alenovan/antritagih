// modal.tsx

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming Dialog is available from this location
import { Button } from "@/components/ui/button"; // Assuming Button is in this location
import { AgentCallActivityData } from "./data"; // Import AgentCallActivityData type

interface AgentCallActivityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: AgentCallActivityData | null;
}

const AgentCallActivityModal: React.FC<AgentCallActivityModalProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  if (!data) return null; // If there's no data, don't render the modal

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogContent className="max-w-3xl mx-auto my-8 bg-white p-6 rounded-lg shadow-2xl overflow-hidden" size="md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Agent Call Activity Details
          </DialogTitle>
        </DialogHeader>

        {/* Table for displaying all the data fields */}
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
                <td className="p-2 font-semibold">Virtual Account</td>
                <td className="p-2">{data.virtual_account}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Customer Name</td>
                <td className="p-2">{data.customer_name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Nominal</td>
                <td className="p-2">${data.jumlah_tagihan.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Phone Number</td>
                <td className="p-2">{data.phone_number}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Call Reason</td>
                <td className="p-2">{data.call_reason}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Call Situation</td>
                <td className="p-2">{data.call_situation}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Call Status</td>
                <td className="p-2">{data.call_status}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Action Date</td>
                <td className="p-2">{data.tgl_aksi}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Flags</td>
                <td className="p-2">{data.flags}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Agent</td>
                <td className="p-2">{data.agent}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Call Type</td>
                <td className="p-2">{data.call_type}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Duration of Call</td>
                <td className="p-2">{data.duration_call}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Comment</td>
                <td className="p-2">{data.comment}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Remark</td>
                <td className="p-2">{data.remark}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Account Status</td>
                <td className="p-2">{data.account_status}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Channel</td>
                <td className="p-2">{data.channel}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Channel Cost</td>
                <td className="p-2">{data.channel_cost.toFixed(2)}</td>
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

export default AgentCallActivityModal;
