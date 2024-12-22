"use client";
import React, { useState } from "react";

import CategoryForm from "./CategoryForm";
import RelativeModal from "../../components/RelativeModal";

export default function EditButton({ category }) {
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
        <RelativeModal setShowForm={toggleModal} title={"Edit Category"}>
          <CategoryForm
            setShowForm={toggleModal}
            isEdit={true}
            category={category}
          />
        </RelativeModal>
      )}
    </div>
  );
}
