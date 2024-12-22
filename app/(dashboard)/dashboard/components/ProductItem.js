// ProductItem.js

import Link from "next/link";

const ProductItem = ({ product, index }) => {
  //console.log(product);
  return (
    <tr
      key={product._id}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-gray-500"
    >
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <img src={product?.image} alt="" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.product_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.brand_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.category_name}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product?.status === "active"
              ? "bg-green-100 text-green-800"
              : product?.status === "inactive"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product?.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`/dashboard/products/${product._id}`}
          className="text-green-600 hover:text-green-500 mr-4"
        >
          Details
        </Link>
        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
};

export default ProductItem;
