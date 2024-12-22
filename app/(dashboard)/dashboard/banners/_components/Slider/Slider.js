import { useFetchSlidersQuery } from "../../../../../../store/slices/SliderApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitlte from "../BannerTitlte";
import SliderTable from "./SliderTable";

const Slider = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchSlidersQuery();

  const sliders = isSuccess ? data.slider : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh]">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"
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
    <div className="dark:bg-gray-900 dark:text-gray-300">
      <BannerTitlte title="Slider List" />

      <div className="flex justify-start mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={openModal}
        >
          Add Slider
        </button>
      </div>

      <SliderTable sliders={sliders} openModal={openModal} />
    </div>
  );
};

export default Slider;
