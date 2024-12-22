import { useFetchDealsQuery } from "../../../../../../store/slices/DealApi";
import Error from "../../../error";
import BannerTitle from "../BannerTitlte";
import DealTable from "./DealTable";

const Deal = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchDealsQuery();

  const deals = isSuccess ? data.deal : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh]">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-36 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Banner Title */}
      <BannerTitle title="Deal List" />

      {/* Add Deal Button */}
      <div className="flex justify-start mt-6 px-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={() => openModal(null, "deal", "add")}
        >
          Add Deal
        </button>
      </div>

      {/* Deal Table */}
      <div className="mt-6 px-4">
        <DealTable openModal={openModal} deals={deals} />
      </div>
    </div>
  );
};

export default Deal;
