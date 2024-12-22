import { useDeleteDealMutation } from "../../../../../../store/slices/DealApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../DeleteModal";

const DealTable = ({ deals, openModal }) => {
  const [
    deleteDeal,
    { isLoading: isDeleting, isSuccess: isDeleted, error, isError },
  ] = useDeleteDealMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const handleDelete = (dealId) => {
    deleteDeal({ dealId });
    setShowModal(false);
  };

  const openDeleteModal = (deal) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedDeal(null);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success("Deal deleted successfully.");
    } else if (isError) {
      toast.error(error.message);
    }
  }, [isDeleted, isError, error]);

  if (!deals || deals.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No deals found.
        </p>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onDelete={() => handleDelete(selectedDeal._id)}
          item={selectedDeal}
          type="deal"
        />
      )}
      <div className="mt-6 space-y-8 ">
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
                    Label
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {deals.map((deal) => (
                  <tr
                    key={deal._id.$oid}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {deal.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {deal.short_description}
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={deal.image}
                        alt={deal.title}
                        width={100}
                        height={100}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {deal.label}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => openModal(deal, "edit")}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(deal)}
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

export default DealTable;
