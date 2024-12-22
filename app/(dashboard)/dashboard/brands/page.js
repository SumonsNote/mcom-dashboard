"use client";
import { useFetchBrandsQuery } from "@/store/slices/brandApi";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import Error from "../components/Error";
import Loading from "../components/Loading";
import NoDataFound from "../components/NoDataFound";
import RelativeModal from "../components/RelativeModal";
import BrandForm from "./_componenets/BrandForm";
import SingeBrand from "./_componenets/SingeBrand";

const BrandsAdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isError, isLoading, isSuccess } = useFetchBrandsQuery();
  const { brands } = isSuccess && data;
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const filteredBrands = brands?.filter((brand) =>
    brand.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <Error error={error.error} />;
  }

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-500 ">Brands</h1>
        <button
          onClick={toggleModal}
          className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-800 text-white dark:text-gray-400 font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <AiOutlinePlus className="w-4 h-4 mr-2" />
          Add Brand
        </button>

        {isOpen && (
          <RelativeModal setShowForm={toggleModal} title={"Add Brand"}>
            <BrandForm setShowForm={toggleModal} />
          </RelativeModal>
        )}
      </div>

      {/* Search */}
      <div className=" rounded-lg shadow">
        <div className="p-6">
          <div className="relative">
            <AiOutlineSearch className="absolute top-3 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search brands..."
              className="pl-10 w-full rounded-lg border dark:bg-inherit dark:text-gray-500 border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      {filteredBrands.length === 0 ? (
        <NoDataFound title="Brands" />
      ) : (
        <div className=" rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Brand List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBrands.map((brand, i) => (
                  <SingeBrand key={brand.id} brand={brand} i={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsAdminPanel;
