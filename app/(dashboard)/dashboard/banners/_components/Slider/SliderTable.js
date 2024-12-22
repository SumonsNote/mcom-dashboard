import { useDeleteSliderMutation } from "../../../../../../store/slices/SliderApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../DeleteModal";

const SliderTable = ({ sliders, openModal }) => {
  const [
    deleteSlider,
    { isLoading: isDeleting, isSuccess: isDeleted, error, isError },
  ] = useDeleteSliderMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);

  const handleDelete = () => {
    deleteSlider({ sliderId: selectedSlider._id });
    setShowModal(false);
  };

  const openDeleteModal = (slider) => {
    setSelectedSlider(slider);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedSlider(null);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success("Slider deleted successfully.");
    } else if (isError) {
      toast.error(error?.message || "Failed to delete the slider.");
    }
  }, [isDeleted, isError, error]);

  if (!sliders || sliders.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No sliders found.
        </p>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onDelete={handleDelete}
          item={selectedSlider}
          type="slider"
          message={`Are you sure you want to delete the slider "${selectedSlider?.title}"? This action cannot be undone.`}
        />
      )}
      <div className="mt-6 space-y-8 dark:bg-gray-900 dark:text-gray-300">
        {/* Table Section */}
        <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Discount Price
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Regular Price
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sliders.map((slider) => (
                  <tr
                    key={slider._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 text-center">
                      {slider.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {slider.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 text-center">
                      {slider.discount_price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 text-center">
                      {slider.regular_price}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Image
                          src={slider.image}
                          width={100}
                          height={100}
                          alt={slider.title}
                          className="object-cover rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => openModal(slider, "edit")}
                          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(slider)}
                          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md dark:bg-red-700 dark:hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
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

export default SliderTable;
