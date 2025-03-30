const Razorpay = require("razorpay");

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100,  // Amount in paise (INR)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};
