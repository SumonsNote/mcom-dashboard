"use client";

import { useAddUserMutation } from "@/store/slices/userApi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserForm = ({ onClose, user, isEdit }) => {
  const { data: session } = useSession();
  const [addUser, { isLoading, isSuccess, data }] = useAddUserMutation();
  // const [updateuser, { isUpdating, isSuccess: isUpdated }] =
  //   useUpdateuserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      status: user?.status || "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    //console.log(data);

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("status", data.status);

    addUser(formData);

    // if (isEdit) {
    //   formData.append("id", user._id);
    //   updateuser(formData);
    // }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User created successfully");
      onClose();
    }
  }, [isSuccess]);

  return (
    <div className="p-6 space-y-4 dark:bg-gray-900 dark:text-gray-300">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            {...register("first_name", { required: "First Name is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter first name"
          />
          {errors.first_name && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            {...register("last_name", { required: "Last Name is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter last name"
          />
          {errors.last_name && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter  username"
          />
          {errors.username && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            {...register("phone", { required: "Phone is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter  phone"
          />
          {errors.phone && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            {...register("email", { required: "Email is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter  email"
          />
          {errors.email && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter  password"
          />
          {errors.password && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="relative">
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <span className="absolute -bottom-6 left-0  text-red-500 text-sm">
              {errors.status.message}
            </span>
          )}
        </div>

        <div className="relative">
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            {session?.user?.role == "super-admin" && (
              <option value="super-admin">Super Admin</option>
            )}
          </select>
          {errors.role && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.role.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-gray-400 bg-blue-500"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
