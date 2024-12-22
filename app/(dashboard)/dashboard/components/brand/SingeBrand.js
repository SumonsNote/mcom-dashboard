import Image from "next/image";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import EditButton from "./EditButton";

export default function SingeBrand({ brand, i }) {
  return (
    <tr
      key={brand.id}
      className="dark:hover:bg-gray-900 hover:bg-gray-200 duration-100 capitalize"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {i + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Image src={brand.logo} width={50} height={50} alt="Logo" />
      </td>{" "}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {brand.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {brand.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            brand.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {brand.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <EditButton brand={brand} />
      </td>
    </tr>
  );
}
