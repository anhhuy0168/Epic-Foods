const Order = require("../Models/Orders");
class ChartController {
  async getChart(req, res) {
    const totalDateOfWeek = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          TotalMoney: {
            $sum: "$price",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          label: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$_id", 1] },
                  then: "Sunday",
                },
                {
                  case: { $eq: ["$_id", 2] },
                  then: "Monday",
                },
                {
                  case: { $eq: ["$_id", 3] },
                  then: "Tuesday",
                },
                {
                  case: { $eq: ["$_id", 4] },
                  then: "Wednesday",
                },
                {
                  case: { $eq: ["$_id", 5] },
                  then: "Thursday",
                },
                {
                  case: { $eq: ["$_id", 6] },
                  then: "Friday",
                },
                {
                  case: { $eq: ["$_id", 7] },
                  then: "Saturday",
                },
              ],
              default: "Unknown",
            },
          },
          TotalMoney: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      status: "success",
      data: {
        totalDateOfWeek,
      },
    });
  }
}
module.exports = new ChartController();
