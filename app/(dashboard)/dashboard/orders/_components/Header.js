import Link from "next/link";
import { IoReload } from "react-icons/io5";

export default function OrderHeader({ refresh, setRefresh }) {
  const handleRefresh = () => {
    setRefresh(true);
  };
  return (
    <div className="flex justify-between items-center xs:flex-col xs:gap-2 mb-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track your orders</p>
      </div>
      <div className="flex gap-4 xs:flex-col xs:gap-2">
        <button
          onClick={handleRefresh}
          className="bg-slate-200 dark:bg-slate-500 inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          <IoReload className={refresh ? "animate-spin" : ""} />
          Refresh
        </button>

        <Link
          href="/dashboard/orders/add"
          className="bg-blue-500 dark:bg-blue-700 dark:text-gray-300 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Create Order
        </Link>
      </div>
    </div>
  );
}
