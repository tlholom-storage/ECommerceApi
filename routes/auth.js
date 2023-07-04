const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString(),
    mobileNumber: req.body.mobileNumber ?? ''
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json({
      success: true,
      entity: others,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(401)
        .json({ success: false, entity: {}, message: "Invalid Credentials" });
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SECRET_KEY
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        res
          .status(401)
          .json({ success: false, entity: {}, message: "Invalid Credentials" });
      } else {
        const { password, ...userInfo } = user._doc;
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "3d" }
        );

        res.status(200).json({
          success: true,
          entity: { ...userInfo, accessToken },
          message: "User Authenticated Successfully",
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

module.exports = router;
