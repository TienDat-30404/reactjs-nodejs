import Order from "../model/OrderModel.js";
import OrderDetail from '../model/OrderDetailModel.js'
export default class StatisticalController {
  static async getSalesRevenue(req, res, next) {
    try {
      const currentYear = new Date().getFullYear();

      const orders = await Order.aggregate([
        {
          $lookup: {
            from: "status",
            localField: "idStatus",
            foreignField: "_id",
            as: "statusOrder"
          }
        },

        { $unwind: "$statusOrder" },
        { $match: { "statusOrder.name": "success" } },
        {
          $group: {
            _id: {
              year: { $year: "$updatedAt" },
              month: { $month: "$updatedAt" }
            },
            totalRevenue: { $sum: "$totalPrice" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
      console.log(orders)

      const revenueByMonth = Array(12).fill(0).map((_, index) => ({
        month: index + 1,
        totalRevenue: 0
      }));

      orders.forEach(order => {
        if (order._id.year === currentYear) {
          console.log(order.totalRevenue)
          revenueByMonth[order._id.month - 1].totalRevenue = order.totalRevenue;
        }
      });

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Thống kê doanh thu bán hàng theo từng tháng trong năm',
        revenueByMonth
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal Server Error when getSaleRevenue`,
        error: error.message
      });
    }
  }

  static async getTopSellingProducts(req, res) {
    try {
      const topProducts = await OrderDetail.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "idOrder",
            foreignField: "_id",
            as: "order"
          }
        },
        { $unwind: "$order" },

        {
          $lookup: {
            from: "status",
            localField: "order.idStatus",
            foreignField: "_id",
            as: "status"
          }
        },
        { $unwind: "$status" },

        { $match: { "status.name": "success" } },

        {
          $group: {
            _id: "$idProductAttribute",
            quantity: { $sum: "$quantity" },

          }
        },

        {
          $lookup: {
            from: "productattributes",
            localField: "_id",
            foreignField: "_id",
            as: "prdAttr"
          }
        },
        { $unwind: "$prdAttr" },

        {
          $lookup: {
            from: "sizes",
            localField: "prdAttr.idSize",
            foreignField: '_id',
            as: 'size'
          }
        },
        { $unwind: "$size" },

        {
          $lookup: {
            from: "products",
            localField: "prdAttr.idProduct",
            foreignField: '_id',
            as: "product"
          }
        },
        { $unwind: '$product' },

        { $sort: { quantity: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 1,
            quantity: 1,
            name: { $concat: ["$product.name", " (size ", "$size.name", ")"] }
          }
        }

      ]);

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Top 10 sản phẩm bán chạy nhất",
        data: topProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy top sản phẩm bán chạy",
        error: error.message
      });
    }
  }


  static async getTopBuyers(req, res, next) {
    try 
    {
      const topBuyers = await Order.aggregate([
        {
          $lookup : {
            from : 'status',
            localField : 'idStatus',
            foreignField : '_id',
            as : 'statusOrder'
          }
        },
        
        {$unwind : "$statusOrder"},

        {$match : {"statusOrder.name" : "success"}},

        {
          $group : {
            _id : "$idUser",
            totalPrice : {$sum : "$totalPrice"}
          }
        },
        {
          $lookup : {
            from : 'users',
            localField : '_id',
            foreignField : '_id',
            as : 'user'
          },
        },
        {$unwind : '$user'},
        {$sort : {totalPrice : -1}},
        {$limit : 10},
        {$project : {
          _id : 1,
          totalPrice : 1,
          userName : "$user.name"
        }}
      ])
      return res.status(200).json({
        topBuyers,
        status : 200,
        message : 'Get top 10 buyers'
      })
    }
    catch(err)
    {
      return res.status(500).json({
        message : `Fail when get top 10 buyers : ${err}`
      })
    }
  }
}
