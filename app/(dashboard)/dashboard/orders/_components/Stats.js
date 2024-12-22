import React, { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";

export default function OrderStats({ orders }) {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    growthRate: 0,
    pendingAttentionCount: 0,
    successRate: 0,
    cancellationRate: 0,
  });

  useEffect(() => {
    if (orders && orders.length > 0) {
      setStats(calculateOrderStats(orders));
    }
  }, [orders]);

  function calculateOrderStats(orders) {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const completedOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;
    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled"
    ).length;

    const previousMonthOrders = orders.filter(
      (order) => order.previousMonth === true
    ).length; // Assuming a 'previousMonth' property
    const growthRate = previousMonthOrders
      ? ((totalOrders - previousMonthOrders) / previousMonthOrders) * 100
      : 0;

    const pendingAttentionCount = orders.filter(
      (order) => order.status === "pending" && order.requiresAttention
    ).length;
    const successRate =
      totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
    const cancellationRate =
      totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      growthRate,
      pendingAttentionCount,
      successRate,
      cancellationRate,
    };
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6  dark:text-gray-300">
      <div className="bg-white dark:bg-gray-700  p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-md">Total Orders</h3>
        <p className="text-4xl font-bold">
          <NumberFlow
            value={stats.totalOrders}
            format={{ notation: "compact" }} // Intl.NumberFormat options
            locales="en-US" // Intl.NumberFormat locales
          />
        </p>
        <span className="text-green-500 text-md">
          {stats.growthRate.toFixed(1)}% from last month
        </span>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-md">Pending Orders</h3>
        <p className="text-4xl font-bold">
          <NumberFlow
            value={stats.pendingOrders}
            format={{ notation: "compact" }} // Intl.NumberFormat options
            locales="en-US" // Intl.NumberFormat locales
          />
        </p>
        <span className="text-yellow-500 text-md">
          {stats.pendingAttentionCount} require attention
        </span>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-md">Completed Orders</h3>
        <p className="text-4xl font-bold">
          <NumberFlow
            value={stats.completedOrders}
            format={{ notation: "compact" }} // Intl.NumberFormat options
            locales="en-US" // Intl.NumberFormat locales
          />
        </p>
        <span className="text-green-500 text-md">
          {stats.successRate.toFixed(1)}% success rate
        </span>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-md">Cancelled Orders</h3>
        <p className="text-4xl font-bold">
          <NumberFlow
            value={stats.cancelledOrders}
            format={{ notation: "compact" }} // Intl.NumberFormat options
            locales="en-US" // Intl.NumberFormat locales
          />
        </p>
        <span className="text-red-500 text-md">
          {stats.cancellationRate.toFixed(1)}% cancellation rate
        </span>
      </div>
    </div>
  );
}
