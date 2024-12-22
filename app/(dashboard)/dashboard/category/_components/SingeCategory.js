import Image from "next/image";
import EditButton from "./EditButton";

export default function SingeCategory({ category, i }) {
  return (
    <tr
      key={category?._id}
      className="dark:hover:bg-gray-700 hover:bg-gray-200 duration-100 capitalize"
    >
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {i + 1}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        <Image
          src={category?.categoryImg}
          width={50}
          height={50}
          alt="Logo"
          className="object-contain bg-gray-200 h-16 w-16 rounded-full"
        />
      </td>{" "}
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {category?.categoryName}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-right text-sm">
        <EditButton category={category} />
      </td>
    </tr>
  );
}
