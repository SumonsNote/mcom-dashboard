import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Eye } from "lucide-react";
import { FullscreenIcon } from "lucide-react";
import Image from "next/image";

export default function PhonesTable({ data }) {
  return (
    <div className="overflow-y-auto h-[80vh]">
      <table className="min-w-full bg-white dark:bg-gray-900 dark:text-gray-400">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Storage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((phone) => (
            <tr key={phone._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={phone.images[0]}
                  width={50}
                  height={50}
                  alt={phone.name}
                  className="h-12 w-12 object-cover rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{phone.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{phone.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ৳{phone.purchase_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{phone.storage}</td>
              <td className="px-6 py-4 whitespace-nowrap">{phone.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    phone.isUsed == "true"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {phone.isUsed == "true" ? "Used" : "New"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Link
                  href={`/dashboard/products/${phone._id}`}
                  className="flex items-center gap-2"
                >
                  <FullscreenIcon className="w-5 h-5 text-blue-600 cursor-pointer" />
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
