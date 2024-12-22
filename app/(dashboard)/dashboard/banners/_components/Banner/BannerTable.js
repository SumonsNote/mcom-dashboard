import Image from "next/image";

const BannerTable = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return (
      <div className="mt-6 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No offers found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8 dark:bg-gray-900">
      {banners.map((banner) => (
        <div key={banner._id.$oid}>
          {/* Weekend Banners Section */}
          {banner.weekend && banner.weekend.length > 0 && (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <h2 className="text-xl font-semibold dark:text-white p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                Weekend Offers
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Image
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {banner.weekend.map((weekendOffer) => (
                      <tr
                        key={weekendOffer._id.$oid}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                          {weekendOffer.title}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          {weekendOffer.short_description}
                        </td>
                        <td className="px-4 py-3">
                          <Image
                            src={weekendOffer.image}
                            width={300}
                            alt={weekendOffer.title}
                            height={300}
                            className="h-16 w-24 object-cover rounded dark:bg-gray-800"
                          />
                        </td>
                        <td className="text-sm text-gray-500 dark:text-gray-300">
                          <button className="bg-blue-500 dark:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>
                          <button className="bg-red-500 dark:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Exclusive Banner Section */}
          {banner.exclusive && (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mt-8">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold p-4 bg-gray-50 dark:bg-gray-800 border-b dark:text-white border-gray-200 dark:border-gray-700">
                  Exclusive Offer
                </h2>
                <td className="text-sm text-gray-500 dark:text-gray-300">
                  <button className="bg-blue-500 dark:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 dark:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Delete
                  </button>
                </td>
              </div>
              <div className="p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 text-sm font-medium text-blue-700 dark:text-white bg-blue-100 dark:bg-blue-700 rounded-full">
                        {banner.exclusive.label}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                        {banner.exclusive.title}
                      </h3>
                    </div>
                    <Image
                      src={banner.exclusive.image}
                      width={300}
                      height={300}
                      alt={banner.exclusive.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BannerTable;
