"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

const ProductAddForm = () => {
  const { control, register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Simulated previous product data
  const prevProductData = {
    storage: "128GB",
    color: "black",
    batteryHealth: 87,
    scratches: "No Scratches",
    dents: "No Dents",
    warranty: "2 Years Service",
    accessories: "Not Available",
    boxStatus: "Without Box",
    grade: "A Plus",
    simVariant: "Single SIM",
    stockQuantity: 25,
    prevImages: [
      "https://example.com/prev-image1.jpg",
      "https://example.com/prev-image2.jpg",
    ],
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const validImageFiles = newFiles.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    const newImagePreviews = validImageFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prevImages) => [...prevImages, ...newImagePreviews]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      images,
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid-cols-2 gap-8">
      {/* Form Section */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <div className="flex flex-wrap gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    width={100}
                    height={100}
                    src={image}
                    alt={`Upload ${index}`}
                    className="w-32 h-32 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  + Add Image
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              className="hidden"
            />
            <p className="text-sm text-gray-500 text-center">
              Upload up to 5 images (Max 5MB per image)
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <select
              {...register("storage")}
              className="w-full p-2 border rounded"
              defaultValue={prevProductData.storage}
            >
              <option value="">Select Storage</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
            </select>

            <select
              {...register("color")}
              className="w-full p-2 border rounded"
              defaultValue={prevProductData.color}
            >
              <option value="">Select Color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Previous Product Details
        </h2>

        {/* Previous Images */}
        <div className="flex justify-center gap-4 mb-6">
          {prevProductData.prevImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Previous ${index}`}
              className="w-40 h-40 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Previous Product Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Storage:</strong> {prevProductData.storage}
          </div>
          <div>
            <strong>Color:</strong> {prevProductData.color}
          </div>
          <div>
            <strong>Battery Health:</strong> {prevProductData.batteryHealth}%
          </div>
          <div>
            <strong>Scratches:</strong> {prevProductData.scratches}
          </div>
          <div>
            <strong>Dents:</strong> {prevProductData.dents}
          </div>
          <div>
            <strong>Warranty:</strong> {prevProductData.warranty}
          </div>
          <div>
            <strong>Accessories:</strong> {prevProductData.accessories}
          </div>
          <div>
            <strong>Box Status:</strong> {prevProductData.boxStatus}
          </div>
          <div>
            <strong>Product Grade:</strong> {prevProductData.grade}
          </div>
          <div>
            <strong>SIM Variant:</strong> {prevProductData.simVariant}
          </div>
          <div>
            <strong>Stock Quantity:</strong> {prevProductData.stockQuantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddForm;
