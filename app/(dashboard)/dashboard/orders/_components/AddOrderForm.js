"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CustomerDetails } from "./CustomerDetails";
import { ProductDetails } from "./ProductDetails";
import { PaymentDetails } from "./PaymentDetails";

import { calculateTotal } from "../../../../../utils/calculations.js";
import { VoucherModal } from "./VoucherModal.js";
import { useAddOrderMutation } from "@/store/slices/orderApi";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddOrderForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [showVoucher, setShowVoucher] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [addOrder, { isError, isLoading, isSuccess, data, error }] =
    useAddOrderMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [],
      payment_method: "cash",
      customer_name: "",
      paid_amount: 0,
      change_amount: 0,
    },
  });

  const items = watch("items");
  const paidAmount = watch("paid_amount");

  useEffect(() => {
    const total = calculateTotal(items);
    setValue("total_amount", total);
    setValue("change_amount", paidAmount ? paidAmount - total : 0);
  }, [items, paidAmount, setValue]);

  const onSubmit = (data) => {
    const shopCode = "KST";
    const today = new Date();
    const datePart = today.toISOString().split("T")[0].replace(/-/g, ""); // Format: YYYYMMDD
    const timePart = today.toTimeString().split(" ")[0].replace(/:/g, ""); // Format: HHMMSS
    const orderNumber = `ORD${datePart}${shopCode}${timePart}`;

    const finalData = {
      customer: {
        customer_name: data.customer_name,
        phone_number: data.mobile,
        email: data.email,
        address: data.address,
      },
      order_number: orderNumber,
      items: data.items,
      total_amount: data.total_amount,
      shipping_details: {
        address: data.address,
        shipping_method: "in-shop",
        shipping_charge: "0",
      },
      payment_info: {
        method: data.payment_method,
        amount: data.total_amount,
        status: data.total_amount <= data.paid_amount ? "paid" : "unpaid",
        transaction_id: data.transaction_id,
        change_amount: data.change_amount,
        transaction_amount: data.paid_amount,
        provider: "N/A",
      },
      status: "delivered",
    };
    setOrderData(finalData);
    addOrder(finalData);

    // setShowVoucher(true);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Order created successfully");
      //console.log(data);
      setShowVoucher(true);
    }
    if (isError) {
      toast.error(error.data.message);
      //console.log(isError);
    }
    if (isLoading) {
      toast.info("Creating order...");
    }
  }, [isSuccess, data, isError]);
  const handleOrderConfirmation = () => {
    // Close the modal first
    setIsModalOpen(false);

    // Trigger form submission programmatically
    document.querySelector("form").requestSubmit();
  };
  return (
    <div className="mx-auto p-6 bg-gray-50 dark:bg-gray-950 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomerDetails register={register} errors={errors} />
        <ProductDetails register={register} setValue={setValue} items={items} />
        <PaymentDetails
          register={register}
          paidAmount={paidAmount}
          items={items}
        />

        <div className="flex justify-end xs:flex-col xs:gap-2 gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border bg-red-200 dark:text-rose-400 border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Order
          </button>
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleOrderConfirmation}
            title="Complete Order"
            message="Are you sure you want to complete this order?"
            confirmText="Confirm Order"
            cancelText="Cancel"
            variant="default"
          />
        </div>
      </form>

      {showVoucher && orderData && (
        <VoucherModal
          orderData={orderData}
          onClose={() => setShowVoucher(false)}
        />
      )}
    </div>
  );
};

export default AddOrderForm;
