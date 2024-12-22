import { useDeleteWeekendMutation } from "../../../../../../store/slices/weekendApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../DeleteModal";

const WeekendTable = ({ weekends, openModal }) => {
  const [
    deleteWeekend,
    { isLoading: isDeleting, isSuccess: isDeleted, error, isError },
  ] = useDeleteWeekendMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedWeekend, setSelectedWeekend] = useState(null);

  const handleDelete = async (weekendId) => {
    deleteWeekend({ id: weekendId });
    setShowModal(false);
  };

  const openDeleteModal = (weekend) => {
    setSelectedWeekend(weekend);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedWeekend(null);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success("Weekend deleted successfully.");
    } else if (isError) {
      toast.error(error.message);
    }
  }, [isDeleted, isError, error]);

  if (!weekends || weekends.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No Weekends found.
        </p>
      </div>
    );
  }

  return (
    <>
      {showModal && selectedWeekend && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onDelete={() => handleDelete(selectedWeekend._id)}
          item={selectedWeekend}
          type="weekend"
        />
      )}
      <div className="mt-6 space-y-8">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-800">
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
                {weekends.map((weekend) => (
                  <tr
                    key={weekend._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {weekend.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {weekend.short_description}
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={weekend.image}
                        alt={weekend.title}
                        width={100}
                        height={100}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => openModal(weekend, "edit")}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(weekend)}
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md dark:bg-red-700 dark:hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekendTable;
