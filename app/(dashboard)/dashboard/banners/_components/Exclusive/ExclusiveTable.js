import { useDeleteExclusiveMutation } from "../../../../../../store/slices/exclusiveApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../DeleteModal";

const ExclusiveTable = ({ exclusives, openModal }) => {
  const [
    deleteExclusive,
    { isLoading: isDeleting, isSuccess: isDeleted, error, isError },
  ] = useDeleteExclusiveMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedExclusive, setSelectedExclusive] = useState(null);

  const handleDelete = (exclusiveId) => {
    deleteExclusive({ id: exclusiveId });
    setShowModal(false);
  };

  const openDeleteModal = (exclusive) => {
    setSelectedExclusive(exclusive);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedExclusive(null);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success("Exclusive offer deleted successfully.");
    } else if (isError) {
      toast.error(error.message);
    }
  }, [isDeleted, isError, error]);

  if (!exclusives || exclusives.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No exclusive offers found.
        </p>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onDelete={() => handleDelete(selectedExclusive._id)}
          item={selectedExclusive}
          type="exclusive"
        />
      )}
      <div className="mt-6 w-full">
        {exclusives.map((exclusive) => (
          <div
            key={exclusive._id}
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-md"
          >
            <Image
              src={exclusive.image}
              alt={exclusive.title}
              width={800}
              height={700}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {exclusive.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exclusive.label}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => openModal(exclusive, "edit")}
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(exclusive)}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md dark:bg-red-700 dark:hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExclusiveTable;
