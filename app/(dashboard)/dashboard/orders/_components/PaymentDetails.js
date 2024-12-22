import { CreditCardIcon } from "lucide-react";
import { calculateTotal } from "../../../../../utils/calculations";
import { convertToWords } from "@/utils/converNumber";

export const PaymentDetails = ({ register, paidAmount, items }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-400 flex items-center gap-2">
        <CreditCardIcon className="w-5 h-5 text-blue-500" />
        Payment Details
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
            Payment Method
          </label>
          <select
            {...register("payment_method")}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
          </select>
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
            Transaction ID
          </label>
          <input
            type="text"
            defaultValue={"N/A"}
            placeholder="Enter Transaction ID"
            {...register("transaction_id")}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
          />
        </div>

        {/* Paid Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2">
            Paid Amount
          </label>
          <input
            type="number"
            step={"0.01"}
            {...register("paid_amount")}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-left">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-500 capitalize">
            In Words: {convertToWords(paidAmount)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-500">
            Total: ৳{calculateTotal(items).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Change: ৳{(paidAmount - calculateTotal(items)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
