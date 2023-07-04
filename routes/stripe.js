const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        current: "usd"
    }, (stripeError, stripeRes)=>{
        if(stripeError){
            res
            .status(500)
            .json({ success: false, entity: stripeError, message: "Error Occurred" });
        }else
        {
            res.status(200).json({
                success: true,
                entity: { ...stripeRes },
                message: "Payment Successfully",
              });
        }
    })
})


module.exports = router;
