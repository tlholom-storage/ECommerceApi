const express = require("express");
const app = express();
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const stripRoutes = require("./routes/stripe");
const slideRoutes = require("./routes/slide");
const categoryRoutes = require("./routes/category");

dotenv.config();
require("./config/database").connect();
app.use(express.json());
app.use(require("./config/cors-policy").corsPolicy);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripRoutes);
app.use("/api/slides", slideRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server Running!");
});
