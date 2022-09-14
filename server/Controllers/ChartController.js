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
  async getChartOfMonth(req, res) {
    const totalOFMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
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
                  then: "Jan",
                },
                {
                  case: { $eq: ["$_id", 2] },
                  then: "Feb",
                },
                {
                  case: { $eq: ["$_id", 3] },
                  then: "Mar",
                },
                {
                  case: { $eq: ["$_id", 4] },
                  then: "Apr",
                },
                {
                  case: { $eq: ["$_id", 5] },
                  then: "Maу",
                },
                {
                  case: { $eq: ["$_id", 6] },
                  then: "Jun",
                },
                {
                  case: { $eq: ["$_id", 7] },
                  then: "Jul",
                },
                {
                  case: { $eq: ["$_id", 8] },
                  then: "Aug",
                },
                {
                  case: { $eq: ["$_id", 9] },
                  then: "Sep",
                },
                {
                  case: { $eq: ["$_id", 10] },
                  then: "Oct",
                },
                {
                  case: { $eq: ["$_id", 11] },
                  then: "Noᴠ",
                },
                {
                  case: { $eq: ["$_id", 12] },
                  then: "Dec",
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
        totalOFMonth,
      },
    });
  }
}
module.exports = new ChartController();
