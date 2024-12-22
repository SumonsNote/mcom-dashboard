import Link from "next/link";
import React from "react";
import { useState } from "react";
import EditOrder from "./EditOrder";
import EditButton from "./EditButton";

export default function OrderTable({ handleSort, sortConfig, sortedOrders }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                Order ID
                {sortConfig.key === "id" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("customer")}
            >
              <div className="flex items-center">
                Customer
                {sortConfig.key === "customer" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortConfig.key === "date" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center">
                Total
                {sortConfig.key === "total" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {order.order_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order?.customer?.customer_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ৳{Number(order.total_amount).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap capitalize`}>
                {order.payment_info.status}
              </td>
              <td>
                <span
                  className={`px-2 py-1 whitespace-nowrap rounded-full capitalize ${getStatusStyle(
                    order.status.toLowerCase()
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center">
                <Link
                  href={`/dashboard/orders/${order._id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View
                </Link>
                {<EditButton order={order} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Status badge styling
export const getStatusStyle = (status) => {
  const styles = {
    delivered: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return styles[status] || "bg-gray-100 text-gray-800";
};
