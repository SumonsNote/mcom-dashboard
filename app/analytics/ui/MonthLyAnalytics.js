// "use client";

import {
  getDailyRevenueForMonth,
  getDailySalesTrends,
  getDeliveredOrderAnalytics,
  getMonthlyAnalytics,
  getMonthlySalesReport,
  getProductSalesReport,
  getTotalRevenue,
} from "../getOrderAnalytics";

// import { useState, useEffect } from "react";

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
// import {
//   getDailyRevenueForMonth,
//   getMonthlyAnalytics,
//   getTopSellingProducts,
// } from "../getOrderAnalytics";

export default async function MonthlyAnalyticsReport() {
  // const [monthlyData, setMonthlyData] = useState(null);
  // const [topProducts, setTopProducts] = useState([]);
  // const [dailyRevenue, setDailyRevenue] = useState([]);
  // const [loading, setLoading] = useState(true);
  const deliveryAnalytics = await getDeliveredOrderAnalytics();
  console.log("deliveryAnalytics", deliveryAnalytics);
  const MonthlySalesReport = await getMonthlySalesReport(2024, 11);
  console.log("MonthlySalesReport", MonthlySalesReport);
  // getTotalRevenue
  const totalRevenue = await getTotalRevenue();
  console.log("totalRevenue", totalRevenue);
  // getProductSalesReport
  const ProductSalesReport = await getProductSalesReport();
  console.log("ProductSalesReport", ProductSalesReport);
  // getDailySalesTrends
  const DailySalesTrends = await getDailySalesTrends(2024, 11);
  console.log("getDailySalesTrends", DailySalesTrends);
  // getMonthlyAnalytics
  const MonthlyAnalytics = await getMonthlyAnalytics();
  console.log("getMonthlyAnalytics", MonthlyAnalytics);
  // getDailyRevenueForMonth
  const DailyRevenueForMonth = await getDailyRevenueForMonth(2024, 11);
  console.log("DailyRevenueForMonth", DailyRevenueForMonth);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const currentDate = new Date();
  //     const year = currentDate.getFullYear();
  //     const month = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

  //     const monthlyAnalytics = await getMonthlyAnalytics(year, month);
  //     const topSellingProducts = await getTopSellingProducts(year, month);
  //     const dailyRevenueData = await getDailyRevenueForMonth(year, month);

  //     setMonthlyData(monthlyAnalytics);
  //     setTopProducts(topSellingProducts);
  //     setDailyRevenue(dailyRevenueData);
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  // console.log("monthlyData", monthlyData);
  // console.log("topProducts", topProducts);
  // console.log("dailyRevenue", dailyRevenue);
  // if (loading) {
  //   return <div className="text-center py-4">Loading...</div>;
  // }
  return <div></div>;
  //   return (

  //     <div className="space-y-6">
  //       <div className="bg-white shadow rounded-lg p-6">
  //         <h2 className="text-2xl font-bold mb-2">Monthly Overview</h2>
  //         <p className="text-gray-600 mb-4">Key metrics for the current month</p>
  //         <div className="grid grid-cols-2 gap-4">
  //           <div>
  //             <h3 className="text-lg font-semibold">Total Orders</h3>
  //             <p className="text-2xl font-bold">{monthlyData.totalOrders}</p>
  //           </div>
  //           <div>
  //             <h3 className="text-lg font-semibold">Total Revenue</h3>
  //             <p className="text-2xl font-bold">${monthlyData.totalRevenue}</p>
  //           </div>
  //           <div>
  //             <h3 className="text-lg font-semibold">Average Order Value</h3>
  //             <p className="text-2xl font-bold">
  //               ${monthlyData.averageOrderValue}
  //             </p>
  //           </div>
  //           <div>
  //             <h3 className="text-lg font-semibold">Total Items Sold</h3>
  //             <p className="text-2xl font-bold">{monthlyData.totalItems}</p>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="bg-white shadow rounded-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4">Order Status Breakdown</h2>
  //         <ul className="space-y-2">
  //           {Object.entries(monthlyData.ordersByStatus).map(([status, count]) => (
  //             <li key={status} className="flex justify-between">
  //               <span className="capitalize">{status}</span>
  //               <span>{count}</span>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>

  //       <div className="bg-white shadow rounded-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
  //         <ul className="space-y-2">
  //           {Object.entries(monthlyData.paymentMethods).map(([method, count]) => (
  //             <li key={method} className="flex justify-between">
  //               <span className="capitalize">{method}</span>
  //               <span>{count}</span>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>

  //       <div className="bg-white shadow rounded-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
  //         <ul className="space-y-4">
  //           {topProducts.map((product, index) => (
  //             <li key={index}>
  //               <div className="font-semibold">
  //                 {product.model} - {product.color}
  //               </div>
  //               <div className="text-gray-600">
  //                 Quantity: {product.totalQuantity}, Revenue: $
  //                 {product.totalRevenue}
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>

  //       <div className="bg-white shadow rounded-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4">Daily Revenue</h2>
  //         <div className="h-80">
  //           <ResponsiveContainer width="100%" height="100%">
  //             <BarChart data={dailyRevenue}>
  //               <XAxis dataKey="day" />
  //               <YAxis />
  //               <Bar dataKey="revenue" fill="#4F46E5" />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
