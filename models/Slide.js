const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    title: { type: String, required: true},
    description: { type: String, required: true },
    backgroundColour: { type: String, required: true, default: "white" },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Slide", SlideSchema);
