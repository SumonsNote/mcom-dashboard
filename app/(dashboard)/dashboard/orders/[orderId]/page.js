"use client";
import { useFetchSingleOrdersQuery } from "@/store/slices/orderApi";
import { Calendar, Printer } from "lucide-react";
import Loading from "../../components/Loading";
import OrderItem from "../_components/OrderItem";
import OrderSummary from "../_components/OrderSummary";
import { getStatusStyle } from "../_components/OrderTable";
import { VoucherTemplateOrder } from "../_components/VoucherTemplate";

const OrderDetails = ({ params }) => {
  const { data, isLoading } = useFetchSingleOrdersQuery(params.orderId);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(VoucherTemplateOrder(data.order));
      printWindow.document.close();
    }
  };

  if (isLoading) return <Loading />;
  const order = data?.order;

  return (
    <div className="p-6 max-w-7xl w-full px-20 xs:px-2  space-y-6">
      {/* Header */}
      <div className="flex justify-between xs:flex-col xs:gap-2  items-center">
        <div>
          <h1 className="text-2xl dark:text-gray-500 font-bold">
            Order {order?.order_number}
          </h1>
          <p className="text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {order?.createdAt.slice(0, 10)}
          </p>
        </div>
        <div className="flex items-center  gap-2">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-flex gap-2"
          >
            <Printer /> Print
          </button>

          <span
            className={`${getStatusStyle(
              order?.status
            )} px-2 py-1 rounded-full`}
          >
            {order?.status}
          </span>
        </div>
      </div>

      {/* Order Summary Cards */}
      <OrderSummary order={order} />

      {/* Order Items */}
      <OrderItem order={order} />
    </div>
  );
};

export default OrderDetails;
