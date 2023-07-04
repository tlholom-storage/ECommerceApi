const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array, required: true },
    sizes: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    colours: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    price: { type: Number, required: true },
    qntyInStock: {type: Number, default: 1},
    inStock: {type: Boolean, default: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
