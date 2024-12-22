import { useFetchWeekendsQuery } from "../../../../../../store/slices/weekendApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitle from "../BannerTitlte";
import WeekendTable from "./WeekendTable";

const Weekend = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchWeekendsQuery();
  const weekend = isSuccess ? data.weekend : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh] dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error className="dark:bg-gray-900" />;
  }
  return (
    <div>
      <BannerTitle title="Weekend List" className="dark:text-white" />

      <div className="dark:bg-gray-900">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={openModal}
        >
          Add weekend offer
        </button>
      </div>
      <WeekendTable weekends={weekend} openModal={openModal} />
    </div>
  );
};

export default Weekend;
