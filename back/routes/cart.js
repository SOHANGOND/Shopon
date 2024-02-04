const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')
const router = require('express').Router();
const Product = require("../models/Product");

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.send(500).json(err);

    }
})


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);

    }
});


//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted");
    } catch (error) {
        res.status(500).json(error)

    }
});


// GET USER CART

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId:req.params.id});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error); 

    }
})

//GET ALL 

router.get("/",verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router; 