const Slide = require("../models/Slide");
const {
  verifyTokenAndAdmin,
} = require("./verify-token");

const router = require("express").Router();

//Create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newSlide = new Slide(req.body);

  try {
    const savedSlide = await newSlide.save();
    res.status(201).json({
      success: true,
      entity: savedSlide,
      message: "Slide Created Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Update
router.put("/:slideId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateSlide = await Slide.findByIdAndUpdate(
      req.params.slideId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      entity: { ...updateSlide._doc },
      message: "Slide Updated Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Delete

router.delete("/:slideId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.slideId);

    res.status(200).json({
      success: true,
      entity: {},
      message: "Slide Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get Single Slide
router.get("/:slideId", async (req, res) => {
  try {
    const returnedSlide = await Slide.findById(req.params.slideId);
    res.status(200).json({
      success: true,
      entity: { ...returnedSlide._doc },
      message: "Slide Retrieved Successfully",
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
    const slides = await Slide.find();

    res.status(200).json({
      success: true,
      entity: { slides },
      message: "Slide List Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

module.exports = router;
