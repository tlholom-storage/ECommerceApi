const Order = require("../models/Order");
const {
  verifyTokenAndAdmin, verifyTokenAndAuthorization,
} = require("./verify-token");

const router = require("express").Router();

//Create

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder= await newOrder.save();
    res.status(201).json({
      success: true,
      entity: savedOrder,
      message: "Order Created Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Update
router.put("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      entity: { ...updateOrder._doc },
      message: "Order Updated Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Delete

router.delete("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({
      success: true,
      entity: {},
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get User Orders
router.get("/:userId", verifyTokenAndAuthorization,  async (req, res) => {
  try {
    const returnOrders = await Order.find({userId: req.params.userId});
    res.status(200).json({
      success: true,
      entity: { ...returnOrders },
      message: "User's Orders Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get
router.get("/", verifyTokenAndAdmin, async (req, res) => {

  try {
    const orders =  await Order.find();

    res.status(200).json({
      success: true,
      entity: { orders },
      message: "Order List Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

module.exports = router;
