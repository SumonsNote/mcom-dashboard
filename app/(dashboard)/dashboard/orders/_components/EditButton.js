import React from "react";
import { useState } from "react";
import EditOrder from "./EditOrder";

export default function EditButton({ order }) {
  const [isEdit, setIsEdit] = useState(false);

  if (order.status === "cancelled" || order.status === "delivered") {
    return null;
  }
  return (
    <div>
      <button
        className="text-gray-600 hover:text-gray-900"
        onClick={() => setIsEdit(true)}
      >
        Edit
      </button>
      {isEdit && (
        <EditOrder orderData={order} setIsEdit={setIsEdit} isEdit={isEdit} />
      )}
    </div>
  );
}
