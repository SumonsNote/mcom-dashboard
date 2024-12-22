import { useFetchBannersQuery } from "@/store/slices/bannerApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitlte from "../BannerTitlte";
import BannerTable from "./BannerTable";

const Banner = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchBannersQuery();
  const banner = isSuccess ? data.banner : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh] dark:bg-gray-900">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error className="dark:bg-gray-900" />;
  }
  return (
    <div>
      <BannerTitlte title="Banner List" className="dark:text-white" />

      <div className="dark:bg-gray-900">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Add Banner
        </button>
      </div>

      <BannerTable banners={banner} />
    </div>
  );
};

export default Banner;
