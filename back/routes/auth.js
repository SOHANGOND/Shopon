const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    // return res.status(400).json("Something went wrong....");
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})



///LOGIN
router.post("/login",async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        // !user && { return res.status(401).send("Wrong Credential!")    };
        if (!user) {
            console.log("Sohan Gond")
            return res.status(401).send("Something went wrong...");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(Originalpassword !== req.body.password) return res.status(401).json("Wrong credentials!");
    
        
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            { expiresIn: "3d" });
        
        const {password, ...others} = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (error) {
        res.status(500).json(error);
        
    }
})  
module.exports = router; 