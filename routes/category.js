const Category = require("../models/Category");
const {
  verifyTokenAndAdmin,
} = require("./verify-token");

const router = require("express").Router();

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json({
      success: true,
      entity: savedCategory,
      message: "Category Created Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Update
router.put("/:categoryId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      entity: { ...updateCategory._doc },
      message: "Category Updated Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Delete
router.delete("/:categoryId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);

    res.status(200).json({
      success: true,
      entity: {},
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get Single Category
router.get("/:categoryId", async (req, res) => {
  try {
    const returnedCategory = await Category.findById(req.params.categoryId);
    res.status(200).json({
      success: true,
      entity: { ...returnedCategory._doc },
      message: "Category Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get
router.get("/", async (req, res) => {

  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      entity: { categories },
      message: "Category List Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

module.exports = router;
