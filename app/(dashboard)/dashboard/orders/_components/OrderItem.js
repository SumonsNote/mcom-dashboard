import { convertToWords } from "@/utils/converNumber";
import { Package } from "lucide-react";

export default function OrderItem({ order }) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-500 rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Order Items</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {order?.items?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between xs:flex-col p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {" "}
                    {item.model} {item.color} {item.variant} ({item.version})
                  </h3>
                  <p className="text-sm text-gray-500">
                    Warranty: {item.warranty}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8 px-4 py-2 rounded-lg">
                <div className="text-right">
                  <p className="font-medium">
                    ৳{Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  ৳{(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                {/* <span>
                  ${(order.payment.amount - order.shipping.cost).toFixed(2)}
                </span> */}
                <span>
                  ৳
                  {order?.total_amount -
                    order?.shipping_details?.shipping_charge}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>৳{order?.shipping_details?.shipping_charge || 0}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>৳{parseInt(order?.total_amount)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg uppercase">
                In Word :{convertToWords(Number(order?.total_amount))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
