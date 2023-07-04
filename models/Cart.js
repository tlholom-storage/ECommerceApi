const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
        selectedSize: {
          key: { type: String, required: true },
          value: { type: String, required: true },
        },
        selectedColour: {
          key: { type: String, required: true },
          value: { type: String, required: true },
        },
      },
    ],
    totalPrice:{
      type: Number,
      default: 0,
    },
    totalItems:{
      type: Number,
      default: 0,
    },
    },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
