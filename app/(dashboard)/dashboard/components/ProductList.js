import Image from "next/image";

const mockProducts = {
  trending: [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 99.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Fitness Tracker",
      price: 79.99,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  new: [
    {
      id: 4,
      name: "Portable Charger",
      price: 49.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 129.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Noise-Canceling Headphones",
      price: 249.99,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  "best-selling": [
    {
      id: 7,
      name: "Smartphone",
      price: 699.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      name: "Laptop",
      price: 999.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 9,
      name: "Tablet",
      price: 399.99,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
};

export async function ProductList({ type }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product/${type}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  let products = [];
  if (data && type) {
    if (type === "trending") {
      products = data.trending_products;
    } else if (type === "new-arrival") {
      products = data.new_products;
    } else if (type === "best-seller") {
      products = data.bestSellers;
    }
  }
  // console.log(products);
  // const products = mockProducts[type];

  return (
    <ul className="space-y-4 dark:text-gray-800  rounded-md">
      {products.slice(0, 5).map((product) => (
        <li
          key={product.id}
          className="flex items-center space-x-4 justify-between hover:bg-gradient-to-tl hover:from-green-400 p-1 transition-all duration-700  rounded-md"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="size-16 bg-gradient-to-tr from-black rounded-md object-cover p-0.5"
          />
          <div className="flex flex-col w-full space-x-4">
            <h3 className="font-semibold">{product.title}</h3>

            <div className="flex items-center space-x-4 justify-between">
              <p className="text-sm text-gray-500">৳{product.currentPrice}</p>
              <span className="text-md text-gray-500">
                Stock:{" "}
                <strong className="text-green-600 p-2">{product.stock}</strong>
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
