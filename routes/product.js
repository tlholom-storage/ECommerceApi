const Product = require("../models/Product");
const {
  verifyTokenAndAdmin,
} = require("./verify-token");

const router = require("express").Router();

//Create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      entity: savedProduct,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Update
router.put("/:productId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      entity: { ...updateProduct._doc },
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Delete

router.delete("/:productId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json({
      success: true,
      entity: {},
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

//Get Single Product
router.get("/:productId", async (req, res) => {
  try {
    const returnedProduct = await Product.findById(req.params.productId);
    res.status(200).json({
      success: true,
      entity: { ...returnedProduct._doc },
      message: "Product Retrieved Successfully",
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
    let products;
    if(req.query.category && req.query.category !='' && req.query.size && req.query.size !='' && req.query.colour && req.query.colour !='')
    {
      const qCategory = req.query.category;
      const qSize = req.query.size;
      const qColour = req.query.colour;
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        "sizes.key": qSize,
        "colours.value": qColour
      })
    }
    else if(req.query.category && req.query.category !='' && req.query.size && req.query.size !='')
    {
      const qCategory = req.query.category;
      const qSize = req.query.size;
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        "sizes.key": qSize,
      })
    }
    else if(req.query.size && req.query.size !='' && req.query.colour && req.query.colour !='')
    {
      const qSize = req.query.size;
      const qColour = req.query.colour;
      products = await Product.find({
        "sizes.key": qSize,
        "colours.value": qColour
      })
    }
    else if(req.query.category && req.query.category !='' && req.query.colour && req.query.colour !='')
    {
      const qCategory = req.query.category;
      const qSize = req.query.size;
      const qColour = req.query.colour;
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        "colours.value": qColour
      })
    }
    else if(req.query.category && req.query.category !='')
    {
      const qCategory = req.query.category;
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
    }
    else if (req.query.size && req.query.size !='')
    {
      const qSize = req.query.size;
      products = await Product.find({
        "sizes.key": qSize,
      })
    }
    else if (req.query.colour && req.query.colour !='')
    {
      const qColour = req.query.colour;
      products = await Product.find({
        "colours.value": qColour
      })
    }
    else
    {
      products = await Product.find();
    }


    res.status(200).json({
      success: true,
      entity: { products },
      message: "Product List Retrieved Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, entity: error, message: "Error Occurred" });
  }
});

module.exports = router;
