import { useFetchCountdownsQuery } from "../../../../../../store/slices/countdownApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitle from "../BannerTitlte";
import CountdownTable from "./CountdownTable";

const Countdown = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchCountdownsQuery();

  const countdown = isSuccess ? data.countdown : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh]">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      {/* Banner Title */}
      <BannerTitle title="Countdown" />

      {/* Countdown Table */}
      <div className="mt-6 px-4">
        <CountdownTable openModal={openModal} countdown={countdown} />
      </div>
    </div>
  );
};

export default Countdown;
