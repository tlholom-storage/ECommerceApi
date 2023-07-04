const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true  },
    img: { type: String, required: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Category", CategorySchema);
