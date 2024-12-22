"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function CategorySideBar({
  categories,
  totalProducts,
  dictionary,
}) {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const { lang } = useParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      const filtered = query.filter((item) => item !== name);
      setQuery(filtered);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const category = params.get("category");
    if (category) {
      const decodedCategory = decodeURI(category);
      const queryInCategory = decodedCategory.split(",");
      setQuery(queryInCategory);
    } else {
      setQuery([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (query.length > 0) {
      params.set("category", encodeURI(query.join(",")));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query, searchParams, pathname, replace]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        {dictionary?.categories}
      </h3>
      {/* Categories */}
      <div className="space-y-2">
        {categories?.map((category) => {
          return (
            <div key={category.name} className="flex items-center">
              <input
                type="checkbox"
                name={category.name.toLowerCase()}
                id={category.id}
                checked={query.includes(category.name.toLowerCase())}
                className="focus:ring-0 rounded-sm cursor-pointer"
                onChange={handleChange}
              />
              <label
                htmlFor={category.id}
                className="text-gray-600 ml-3 cursor-pointer"
              >
                {lang === "en" ? category.name : category.nameBangla}{" "}
              </label>
              <div className="ml-auto text-gray-600 text-sm">
                ({totalProducts[category.catID]})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
