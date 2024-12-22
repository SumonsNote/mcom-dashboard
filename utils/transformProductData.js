export function transformProductData(product) {
  return {
    image: product?.images && product.images[0], // Use the first image
    name: product.model,
    title: `${product.model} ${product.ram}/${product.storage} ${product.region}`,
    rating: "5", // Default rating since no reviews are present
    currentPrice:
      product.discount_price == 0
        ? product.original_price
        : product.discount_price,
    oldPrice: product.original_price,
    discount: product.discount_price == 0 ? 0 : product.discount_price,
    soldOut: product.stock === 0,
    filters: [
      {
        filterName: "model",
        value: product.model,
      },
      {
        filterName: "stock",
        value: product.stock <= 2 ? "low-stock" : "in-stock",
      },
      {
        filterName: "storage",
        value: product.storage,
      },
      {
        filterName: "brand",
        value: product?.brand?.toLowerCase(),
      },
    ],
    url: `/product/${product._id}`,
    id: product._id,

    brand: product?.brand,
    model: product.model,
    ram: product.ram,
    storage: product.storage,
    region: product.region,
    stock: product.stock,
    color: product.color,
    warrantyStatus: product.warrantyStatus,

  };
}
