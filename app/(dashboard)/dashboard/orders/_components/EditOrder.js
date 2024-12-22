import { useUpdateOrderMutation } from "@/store/slices/orderApi";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditOrder({ orderData, setIsEdit }) {
  const [order, setOrder] = useState(orderData || {});
  const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);
    updateOrder(order);
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating Order");
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success("Order Updated");
      setIsEdit(false);
    }
  }, [orderData, isLoading, isSuccess]);
  return (
    <div className="fixed w-screen h-screen left-0 top-0 bg-black/20 z-20 text-start">
      <div className="absolute top-1/2 left-1/2 min-w-96 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 dark:text-gray-400 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-medium mb-4">Edit Order</h2>
        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="block w-full text-sm font-medium text-gray-700  dark:text-gray-400 ring-1 rounded-md p-2 mb-2"
              value={order?.status}
              onChange={(e) => {
                setOrder({
                  ...order,
                  status: e.target.value,
                });
              }}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="grid gap-6">
            {/* Payment Method */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-500  mb-2">
                Payment Method
              </label>
              <select
                className="w-full rounded-lg border-gray-200  text-sm ring-1  p-2"
                id="payment_method"
                name="payment_method"
                value={order?.payment_info.method}
                onChange={(e) => {
                  setOrder({
                    ...order,
                    payment_info: {
                      ...order?.payment_info,
                      method: e.target.value,
                    },
                  });
                }}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-500  mb-2">
                Transaction ID
              </label>
              <input
                id="transaction_id"
                name="transaction_id"
                value={order?.payment_info.transaction_id}
                onChange={(e) => {
                  setOrder({
                    ...order,
                    payment_info: {
                      ...order.payment_info,
                      transaction_id: e.target.value,
                    },
                  });
                }}
                type="text"
                placeholder="Enter Transaction ID"
                className="w-full rounded-lg border-gray-200 p-2 text-sm ring-1 "
              />
            </div>

            {/* Paid Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-500  mb-2">
                Paid Amount
              </label>
              <input
                id="paid_amount"
                name="paid_amount"
                value={Number(order?.payment_info.amount)}
                onChange={(e) => {
                  setOrder({
                    ...order,
                    payment_info: {
                      ...order.payment_info,
                      status:
                        order.total_amount == e.target.value
                          ? "paid"
                          : "unpaid",
                      amount: e.target.value,
                    },
                  });
                }}
                type="number"
                step={"0.01"}
                className="w-full rounded-lg border-gray-200 p-2 text-sm ring-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => {
                setOrder(orderData);
                setIsEdit(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
