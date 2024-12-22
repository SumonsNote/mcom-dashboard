import { useFetchShopProductsQuery } from "@/store/slices/shopApi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
  value,
  onChange,
  onBlur,
  placeholder = "Search...",
  className = "",
  containerClassName = "",
  optionClassName = "",
  optionActiveClassName = "bg-primary-500 text-white",
  noOptionsMessage = "No results found",
  loadingMessage = "Loading...",
  errorMessage = "Failed to fetch options",
  image = "true",
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, isLoading, error } = useFetchShopProductsQuery(searchTerm, {
    skip: !searchTerm || searchTerm.length < 2,
  });
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (value === "" || value === undefined || value === null) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (value.length >= 2) {
        // Query will automatically trigger due to searchTerm change
        setIsDropdownOpen(true);
      }
    }, 500);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.name);
    onChange(option);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${containerClassName}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsDropdownOpen(false), 200);
          onBlur?.();
        }}
        className={`form-select w-full ${className}`}
      />

      {isDropdownOpen && (
        <ul
          className={`bg-background absolute top-full left-0 w-full border border-gray-300 max-h-60 overflow-y-auto z-10`}
        >
          {isLoading ? (
            <li className={`p-2 ${optionClassName}`}>{loadingMessage}</li>
          ) : error ? (
            <li className={`p-2 text-red-500 ${optionClassName}`}>
              {errorMessage}
            </li>
          ) : data?.products?.length > 0 ? (
            data.products.map((option) => (
              <li
                key={option._id}
                onClick={() => handleOptionClick(option)}
                className={`p-2 cursor-pointer border-b text-black border-gray-200 hover:${optionActiveClassName} ${optionClassName}`}
              >
                <div className=" w-fit p-2 flex text-xs">
                  {option?.image && (
                    <Image
                      src={option?.image}
                      alt={option?.name}
                      width={50}
                      height={150}
                      className="object-contain  h-16 w-16 "
                    />
                  )}
                  <div className="ml-4 text-black grid">
                    <strong>{option.title}</strong>
                    <span className="capitalize">
                      {option.filters[3].value}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className={`p-2 ${optionClassName}`}>{noOptionsMessage}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
