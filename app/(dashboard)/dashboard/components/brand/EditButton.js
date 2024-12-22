"use client";
import React, { useState } from "react";
import RelativeModal from "../RelativeModal";
import BrandForm from "./BrandForm";

export default function EditButton({ brand }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <button
        onClick={toggleModal}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Edit
      </button>
      {isOpen && (
        <RelativeModal setShowForm={toggleModal} title={"Edit Brand"}>
          <BrandForm setShowForm={toggleModal} isEdit={true} brand={brand} />
        </RelativeModal>
      )}
    </div>
  );
}
