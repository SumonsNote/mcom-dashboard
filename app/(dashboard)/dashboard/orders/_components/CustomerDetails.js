import { UserIcon } from "lucide-react";

export const CustomerDetails = ({ register, errors }) => {
  return (
    <div className="bg-white  rounded-xl shadow-sm p-4 border  border-gray-100 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-400 flex items-center gap-2">
        <UserIcon className="w-5 h-5 text-blue-500" />
        Customer Details
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mobile field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mobile Number*
          </label>
          <input
            {...register("mobile", { required: true })}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">
              Mobile number is required
            </p>
          )}
        </div>

        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer Name*
          </label>
          <input
            {...register("customer_name", { required: true })}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            placeholder="Enter customer name"
          />
          {errors.customer_name && (
            <p className="text-red-500 text-sm mt-1">
              Customer name is required
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            placeholder="customer@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Address field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Delivery Address*
          </label>
          <textarea
            {...register("address", { required: true })}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm placeholder:dark:text-gray-700"
            rows="2"
            placeholder="26/3, Road 12, Block B, Banani, Dhaka-1213"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              Delivery address is required
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
