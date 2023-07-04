const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verify-token");

const router = require("express").Router();

//Update
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...userInfo } = updatedUser._doc;
    res.status(200).json({
      success: true,
      entity: { ...userInfo },
      message: "User Data Updated Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Delete

router.delete("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({
      success: true,
      entity: {},
      message: "User Data Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get Single User
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const returnedUser = await User.findById(req.params.userId);
    const { password, ...userInfo } = returnedUser._doc;
    res.status(200).json({
      success: true,
      entity: { ...userInfo },
      message: "User Data Retrieved Successfully",
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
      const users = await User.find();
      res.status(200).json({
        success: true,
        entity: { users },
        message: "User List Retrieved Successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, entity: error, message: "Error Occurred" });
    }
  });
  

module.exports = router;
