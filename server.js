import express from 'express';
import dotenv from "dotenv";
import Stripe from 'stripe';
const PORT = process.env.PORT || 3000;

// load variables.....

dotenv.config();

// start server....
const app = express();

app.use(express.static("Main"));
app.use(express.json());

// Home router.....

app.get("/", (req , res) =>{
    res.sendFile("index.html", {root:"Main"});
})
// Cart....
app.get("/cart.html", (req, res) => {
    res.sendFile("cart.html", {root: "Main"});
});
// success payment.....
app.get("/success.html", (req, res) => {
    res.sendFile("success.html", {root: "Main"});
});
// failed payment.....
app.get("/cancel.html", (req, res) => {
    res.sendFile("cancel.html", {root: "Main"});
});

// stripe......

let stripeGateway = Stripe(process.env.stripe_key);
app.post("/stripe-checkout", async(req, res)=>{
    const lineItems = req.body.items.map((item) =>{
        const unitAmount = parseInt(parseFloat(item.price)* 100)
        console.log("item-price:", item.price);
        console.log("unitAmount:", unitAmount);
        return{
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [item.image],                  
                },
                unit_amount: unitAmount,
            },
            quantity : item.quantity,
        }
    })
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url : `http://localhost:3000/success.html`,
        cancel_url : `http://localhost:3000/cancel.html`,
        billing_address_collection : "required",
        line_items: lineItems,
    });
    res.json({url: session.url});
});

 // Use the Render-assigned port or default to 3000 for local development

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

