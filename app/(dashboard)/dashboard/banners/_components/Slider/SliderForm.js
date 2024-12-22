"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  useAddSliderMutation,
  useUpdateSliderMutation,
} from "../../../../../../store/slices/SliderApi";
import SearchableDropdown from "../../../components/ui/SearchableDropdown";

const SliderForm = ({ onClose, slider, isEdit }) => {
  const [imagePreview, setImagePreview] = useState(slider?.image);
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(slider?.product || "");

  const [addSlider, { isLoading, isSuccess, data }] = useAddSliderMutation();
  const [updateSlider, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateSliderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      image: slider?.image || null,
      title: slider?.title || "",
      description: slider?.description || "",
      regular_price: slider?.regular_price || "",
      discount_price: slider?.discount_price || "",
    },
  });

  useEffect(() => {
    if (slider) {
      setImagePreview(slider.image);
    }
  }, [slider]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product`
        );
        const productData = await response.json();
        setProducts(productData?.products);
      } catch (error) {
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 2000000) {
      toast.error("File size should be less than 2MB.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setValue("image", file);
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("regular_price", data.regular_price);
    formData.append("discount_price", data.discount_price);
    formData.append("productId", selectedProduct.id);

    if (data.image) {
      if (data.image.size > 2000000) {
        toast.error("File size should be less than 2MB.");
        return;
      }
      formData.append("file", data.image);
    }

    if (isEdit) {
      formData.append("id", slider._id);
      updateSlider(formData);
    } else {
      addSlider(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Slider created successfully");
      onClose();
    } else if (isUpdated) {
      toast.success("Slider updated successfully");
      onClose();
    }
  }, [isSuccess, isUpdated]);

  return (
    <div className="p-6 space-y-4 dark:bg-gray-900 dark:text-gray-300">
      <h2>{isEdit ? "Edit Slider" : "Add a Slider"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload Section */}
        <div className="flex items-center justify-center">
          <label
            htmlFor="slider-image-input"
            className="relative border overflow-hidden border-dashed border-gray-600 dark:border-gray-400 dark:text-gray-400 px-4 py-2 rounded-md cursor-pointer w-full h-32 text-sm flex items-center justify-center flex-col gap-2"
          >
            <BiCloudUpload className="text-3xl" /> Upload Banner Image
            {imagePreview && (
              <div className="absolute top-0 left-0 right-0 rounded-md">
                <Image
                  src={imagePreview}
                  alt="Logo Preview"
                  className="object-fill w-full h-32 rounded-md opacity-40"
                  width={300}
                  height={120}
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 ring-1 rounded-full bg-blue-500 hover:bg-red-600 p-1"
                  aria-label="Remove Logo"
                >
                  <AiFillCloseCircle className="text-2xl" />
                </button>
              </div>
            )}
          </label>
          <input
            id="slider-image-input"
            type="file"
            {...register("image")}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Product Selection */}
        <div className="relative">
          <SearchableDropdown
            value={selectedProduct}
            onChange={(value) => setSelectedProduct(value)}
            options={products.map((product) => ({
              value: product._id,
              label: product.name,
            }))}
            placeholder="Search for a product"
            className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            optionClassName="bg-gray-100 hover:bg-gray-200"
            optionActiveClassName="bg-primary-500 text-white"
          />
          {errors.product && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              Product is required
            </span>
          )}
        </div>

        <div className="relative">
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter banner title"
          />
          {errors.title && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            rows="2"
            placeholder="Enter banner description"
          />
          {errors.description && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              {...register("regular_price", {
                required: "Regular price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price cannot be negative" },
              })}
              type="number"
              className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
              placeholder="0.00"
            />
            {errors.regular_price && (
              <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                {errors.regular_price.message}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              {...register("discount_price", {
                required: "Discount price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price cannot be negative" },
              })}
              type="number"
              className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
              placeholder="0.00"
            />
            {errors.discount_price && (
              <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                {errors.discount_price.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading || isUpdating}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-gray-400 bg-blue-500"
        >
          {isLoading || isUpdating ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SliderForm;
