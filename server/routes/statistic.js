const express = require("express");
const router = express.Router();
const ChartController = require("../Controllers/ChartController");
router.get("/get_chart/dateOfWeek", ChartController.getChart);
router.get("/get_chart/ofMonth", ChartController.getChartOfMonth);

module.exports = router;
