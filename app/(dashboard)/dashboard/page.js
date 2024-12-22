import { getDeliveredOrderAnalytics } from "@/app/analytics/getOrderAnalytics";
import NumberFlow from "@number-flow/react";
import { ProductList } from "./components/ProductList";
import { AnalyticsOverview } from "./components/AnalyticsOverview";
import MonthlyAnalyticsReport from "@/app/analytics/ui/MonthLyAnalytics";

export default async function Dashboard() {
  const analytics = await getDeliveredOrderAnalytics();

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 w-full min-h-screen">
      <div className="w-full mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-500">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of your store&apos;s performance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-col-3 text-gray-500 gap-6 mb-8">
          {/* Sales Card */}
          {/* Orders Card */}

          <div className="bg-indigo-50 dark:bg-indigo-800/70 p-4 rounded-lg shadow">
            <h3 className="text-indigo-600 font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">
              <NumberFlow
                value={analytics.totalDeliveredItems}
                format={{ notation: "compact" }} // Intl.NumberFormat options
                locales="en-US" // Intl.NumberFormat locales
              />
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-800/70 p-4 rounded-lg shadow">
            <h3 className="text-green-600 font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">
              {analytics.totalDeliveredAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "BDT",
              })}
            </p>
          </div>
          {/* Customers Card */}

          <div className="bg-blue-50 dark:bg-blue-800/70 p-4 rounded-lg shadow">
            <h3 className="text-blue-600 font-semibold">Total Customers</h3>
            <p className="text-2xl font-bold">
              {" "}
              <NumberFlow
                value={analytics.totalDeliveredOrders}
                format={{ notation: "compact" }} // Intl.NumberFormat options
                locales="en-US" // Intl.NumberFormat locales
              />
            </p>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-gradient-to-tr from-purple-400 dark:to-white  dark:bg-gray-900 dark:text-gray-600 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Trending Products</h2>
            <ProductList type="trending" />
          </div>

          <div className="rounded-lg bg-gradient-to-tr from-green-300 dark:to-white dark:bg-gray-900 dark:text-gray-600 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">New Products</h2>
            <ProductList type="new-arrival" />
          </div>

          <div className="rounded-lg bg-gradient-to-tr from-pink-600  dark:to-white dark:bg-gray-900 dark:text-gray-600 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">
              Best Selling Products
            </h2>
            <ProductList type="best-seller" />
          </div>
        </div>

        <div className="rounded-lg bg-white dark:bg-gray-900 dark:text-gray-600 p-6 shadow-md mt-10">
          <h2 className="mb-4 text-xl font-semibold">Analytics Overview</h2>
          <AnalyticsOverview />
        </div>
        <MonthlyAnalyticsReport />
      </div>
    </div>
  );
}
