"use client";
import AddProductForm from "./components/AddProductForm";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-500 py-6 flex flex-col justify-center sm:py-12 w-full overflow-hidden ">
      <div className="relative py-3 px-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 dark:from-cyan-500 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white dark:bg-slate-700 shadow-lg shadow-slate-400 rounded-xl sm:rounded-3xl">
          <h1 className="text-2xl font-semibold mb-6 text-center dark:text-gray-400">
            Add New Product
          </h1>
          <AddProductForm />
        </div>
      </div>
    </div>
  );
}
