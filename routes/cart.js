const Cart = require("../models/Cart");
const {
  verifyTokenAndAdmin, verifyTokenAndAuthorization,
} = require("./verify-token");

const router = require("express").Router();

//Create

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart= await newCart.save();
    res.status(201).json({
      success: true,
      entity: savedCart,
      message: "Cart Created Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Update
router.put("/:cartId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      entity: { ...updateCart._doc },
      message: "Cart Updated Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Delete

router.delete("/:cartId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);

    res.status(200).json({
      success: true,
      entity: {},
      message: "Cart Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get User Cart
router.get("/:userId", verifyTokenAndAuthorization,  async (req, res) => {
  try {
    const returnCart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json({
      success: true,
      entity: { ...returnCart._doc },
      message: "User's Cart Retrieved Successfully",
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
    const carts =  await Cart.find();

    res.status(200).json({
      success: true,
      entity: { carts },
      message: "Cart List Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

module.exports = router;
