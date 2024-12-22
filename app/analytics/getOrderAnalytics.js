import connectMongo from "@/services/mongo";
import { Order } from "../models/order-model";

const getOrderAnalytics = async () => {
  await connectMongo();
  try {
    const analytics = await Order.aggregate([
      {
        $facet: {
          totalOrders: [{ $count: "count" }],
          totalItems: [
            {
              $unwind: "$items",
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
          totalAmount: [
            {
              $group: {
                _id: null,
                total: { $sum: { $toDouble: "$total_amount" } },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalOrders: { $arrayElemAt: ["$totalOrders.count", 0] },
          totalItems: { $arrayElemAt: ["$totalItems.count", 0] },
          totalAmount: { $arrayElemAt: ["$totalAmount.total", 0] },
        },
      },
    ]);

    // Default to zero if any values are null or undefined
    const result = {
      totalOrders: analytics[0]?.totalOrders || 0,
      totalItems: analytics[0]?.totalItems || 0,
      totalAmount: analytics[0]?.totalAmount || 0,
    };

    return result;
  } catch (error) {
    console.error("Error in getOrderAnalytics:", error);
    throw error;
  }
};
const getDeliveredOrderAnalytics = async () => {
  await connectMongo();

  try {
    const analytics = await Order.aggregate([
      // Match only delivered orders
      { $match: { status: "delivered" } },
      {
        $facet: {
          totalDeliveredOrders: [{ $count: "count" }],
          totalDeliveredItems: [
            { $unwind: "$items" },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],
          totalDeliveredAmount: [
            {
              $group: {
                _id: null,
                total: { $sum: { $toDouble: "$total_amount" } },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalDeliveredOrders: {
            $arrayElemAt: ["$totalDeliveredOrders.count", 0],
          },
          totalDeliveredItems: {
            $arrayElemAt: ["$totalDeliveredItems.count", 0],
          },
          totalDeliveredAmount: {
            $arrayElemAt: ["$totalDeliveredAmount.total", 0],
          },
        },
      },
    ]);

    // Default to zero if any values are null or undefined
    const result = {
      totalDeliveredOrders: analytics[0]?.totalDeliveredOrders || 0,
      totalDeliveredItems: analytics[0]?.totalDeliveredItems || 0,
      totalDeliveredAmount: analytics[0]?.totalDeliveredAmount || 0,
    };

    return result;
  } catch (error) {
    console.error("Error in getDeliveredOrderAnalytics:", error);
    throw error;
  }
};

const getMonthlySalesReport = async (year, month) => {
  const startOfMonth = new Date(year, month - 1, 1); // Start of month
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // End of month

  const report = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        status: { $in: ["shipped", "delivered"] }, // Only completed orders
      },
    },
    {
      $unwind: "$items", // Decompose the items array
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $toDouble: "$payment_info.amount" } },
        totalOrders: { $sum: 1 },
        totalItemsSold: { $sum: "$items.quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
        totalOrders: 1,
        totalItemsSold: 1,
      },
    },
  ]);

  return report[0] || { totalRevenue: 0, totalOrders: 0, totalItemsSold: 0 };
};
const getTotalRevenue = async () => {
  const report = await Order.aggregate([
    {
      $match: {
        status: { $in: ["shipped", "delivered"] }, // Only completed orders
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $toDouble: "$payment_info.amount" } },
      },
    },
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);

  return report[0]?.totalRevenue || 0;
};
const getProductSalesReport = async () => {
  const report = await Order.aggregate([
    {
      $match: {
        status: { $in: ["shipped", "delivered"] }, // Only completed orders
      },
    },
    {
      $unwind: "$items", // Decompose the items array
    },
    {
      $group: {
        _id: "$items.model", // Group by product model
        totalRevenue: {
          $sum: { $multiply: ["$items.price", "$items.quantity"] },
        },
        totalQuantitySold: { $sum: "$items.quantity" },
      },
    },
    {
      $project: {
        _id: 1,
        totalRevenue: 1,
        totalQuantitySold: 1,
      },
    },
    { $sort: { totalRevenue: -1 } }, // Sort by highest revenue
  ]);

  return report;
};
const getDailySalesTrends = async (startDate, endDate) => {
  const report = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        status: { $in: ["shipped", "delivered"] },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalRevenue: { $sum: { $toDouble: "$payment_info.amount" } },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } }, // Sort by date
  ]);

  return report;
};
const getCustomerPurchaseHistory = async (customerId) => {
  const history = await Order.aggregate([
    {
      $match: {
        customer: mongoose.Types.ObjectId(customerId),
        status: { $in: ["shipped", "delivered"] },
      },
    },
    {
      $project: {
        order_number: 1,
        createdAt: 1,
        items: 1,
        totalAmount: { $toDouble: "$payment_info.amount" },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return history;
};

export async function getMonthlyAnalytics(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const pipeline = [
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: { $toDouble: "$total_amount" } },
        averageOrderValue: { $avg: { $toDouble: "$total_amount" } },
        totalItems: { $sum: { $size: "$items" } },
        ordersByStatus: {
          $push: {
            status: "$status",
            count: 1,
          },
        },
        paymentMethods: {
          $push: {
            method: "$payment_info.method",
            count: 1,
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalOrders: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] },
        averageOrderValue: { $round: ["$averageOrderValue", 2] },
        totalItems: 1,
        ordersByStatus: {
          $arrayToObject: {
            $map: {
              input: {
                $setUnion: "$ordersByStatus.status",
              },
              as: "status",
              in: {
                k: "$$status",
                v: {
                  $size: {
                    $filter: {
                      input: "$ordersByStatus",
                      cond: { $eq: ["$$this.status", "$$status"] },
                    },
                  },
                },
              },
            },
          },
        },
        paymentMethods: {
          $arrayToObject: {
            $map: {
              input: {
                $setUnion: "$paymentMethods.method",
              },
              as: "method",
              in: {
                k: "$$method",
                v: {
                  $size: {
                    $filter: {
                      input: "$paymentMethods",
                      cond: { $eq: ["$$this.method", "$$method"] },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  ];

  const result = await Order.aggregate(pipeline);
  return result[0] || null;
}

export async function getTopSellingProducts(year, month, limit = 5) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const pipeline = [
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: {
          id: "$items.id",
          model: "$items.model",
          color: "$items.color",
        },
        totalQuantity: { $sum: "$items.quantity" },
        totalRevenue: {
          $sum: {
            $multiply: [{ $toDouble: "$items.price" }, "$items.quantity"],
          },
        },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        id: "$_id.id",
        model: "$_id.model",
        color: "$_id.color",
        totalQuantity: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] },
      },
    },
  ];

  return await Order.aggregate(pipeline);
}

export async function getDailyRevenueForMonth(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const pipeline = [
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        dailyRevenue: { $sum: { $toDouble: "$total_amount" } },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        day: "$_id",
        revenue: { $round: ["$dailyRevenue", 2] },
      },
    },
  ];

  return await Order.aggregate(pipeline);
}

export {
  getDeliveredOrderAnalytics,
  getOrderAnalytics,
  getProductSalesReport,
  getDailySalesTrends,
  getCustomerPurchaseHistory,
  getMonthlySalesReport,
  getTotalRevenue,
};
export default getOrderAnalytics;
