// StockProductItem.js

const StockProductItem = ({ product }) => {
  //console.log(product);
  return (
    <tr key={product._id} className="hover:bg-gray-50 text-black">
      <td className="px-6 py-4 whitespace-nowrap">
        {product?.product?.product_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {product?.product?.category_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.sell_price}</td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.stock}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {product?.product?.brand_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
};

export default StockProductItem;
