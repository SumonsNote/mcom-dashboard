"use client";

import { useUpdateCountdownMutation } from "../../../../../../store/slices/countdownApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CountdownForm = ({ onClose, countdown, isEdit }) => {
  const [updateCountdown, { isUpdating, isSuccess: isUpdated }] =
    useUpdateCountdownMutation();

  const formatDateTime = (date) =>
    date ? new Date(date).toISOString().slice(0, 16) : "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: countdown?.label || "",
      title: countdown?.title || "",
      description: countdown?.description || "",
      start_date: formatDateTime(countdown?.start_date),
      end_date: formatDateTime(countdown?.end_date),
      is_active: countdown?.is_active || false,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("label", data.label);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("is_active", data.is_active);

    if (isEdit) {
      formData.append("id", countdown._id);
      updateCountdown(formData);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Countdown updated successfully");
      onClose();
    }
  }, [isUpdated]);

  return (
    <div className="p-6 space-y-4 dark:bg-gray-900 dark:text-gray-300">
      <h2>Update Countdown</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* label */}
        <div className="relative">
          <input
            {...register("label", { required: "Label is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter label"
          />
          {errors.label && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.label.message}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="relative">
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter banner title"
          />
          {errors.title && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="relative">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            rows="2"
            placeholder="Enter countdown description"
          />
          {errors.description && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Start Date */}
        <div className="relative">
          <input
            {...register("start_date", { required: "Start Date is required" })}
            type="datetime-local"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
          />
          {errors.start_date && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.start_date.message}
            </span>
          )}
        </div>

        {/* End Date */}
        <div className="relative">
          <input
            {...register("end_date", { required: "End Date is required" })}
            type="datetime-local"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
          />
          {errors.end_date && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.end_date.message}
            </span>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("is_active")}
            className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
          <label
            htmlFor="is_active"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Active
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isUpdating}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-gray-400 bg-blue-500"
        >
          {isUpdating ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CountdownForm;
