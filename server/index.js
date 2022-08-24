const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();
const authRouter = require("./routes/auth");
const foodsRouter = require("./routes/food");
const cartRouter = require("./routes/cart");
const adminRouter = require("./routes/admin");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sbcvi.mongodb.net/Epic-Foods?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/foods", foodsRouter);
app.use("/auth/cart", cartRouter);
app.use("/api/admin", adminRouter);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// // app.use('/api/auth', authRouter)
connectDB();

app.listen(5000, () => {
  console.log("server run prefectly");
});
