import { PrinterIcon, DownloadIcon } from "lucide-react";
import { VoucherTemplate } from "./VoucherTemplate";
import { useRouter } from "next/navigation";

export const VoucherModal = ({ orderData, onClose }) => {
  const router = useRouter();
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    router.push("/dashboard/orders");
    if (printWindow) {
      printWindow.document.write(VoucherTemplate(orderData));
      printWindow.document.close();
      // printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-300">
          Order Successfully Created!
        </h2>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700">
            Order Number:{" "}
            <span className="font-semibold">{orderData.order_number}</span>
          </p>
          <p className="text-gray-700">
            Total Amount:{" "}
            <span className="font-semibold">
              ৳{orderData.total_amount?.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PrinterIcon className="w-5 h-5" />
            Print Voucher
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};
