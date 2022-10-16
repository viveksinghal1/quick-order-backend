const express = require("express");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const fs = require("fs");
const middleware = require("../middleware/index");
let router = express.Router();
const User = require("../models/user");
const seedDB = require("../seed");

const RSA_PRIVATE_KEY = fs.readFileSync("./private.key");

router.post("/register", async function(req, res){
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(409).send("This email-id is already registered");
        } else {
            let encryptedPassword = cryptoJS.SHA256(req.body.password);
            let user = new User({
                password: encryptedPassword,
                email: req.body.email,
                name: req.body.name
            });
            let registeredUser =  await user.save();
            console.log("registered User", registeredUser);
            try {
                let payload = { subject: registeredUser._id };
                let token = jwt.sign(payload, RSA_PRIVATE_KEY, { algorithm: 'RS256' });
                res.status(201).json({
                    idToken: token,
                    name: registeredUser.name,
                    email: registeredUser.email
                });
            } catch(err) {
                console.log(err);
                res.status(401).send(err);
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post("/login", async function(req, res){
    try {
        let foundUser = await User.findOne({email: req.body.email});
        console.log("found User", foundUser);
        if (!foundUser) {
            res.status(401).send("Invalid Email");
        } else {
            let formPassword = cryptoJS.SHA256(req.body.password).toString();
            console.log("password", foundUser.password);
            console.log("password form", formPassword);
            if (formPassword!==foundUser.password) {
                res.status(401).send("Incorrect Password");
            } else {
                try {
                    let payload = { subject: foundUser._id };
                    let token = jwt.sign(payload, RSA_PRIVATE_KEY, {algorithm: 'RS256' });
                    res.status(200).json({
                        idToken: token,
                        name: foundUser.name,
                        email: foundUser.email
                    });
                } catch(err) {
                    res.status(401).send("Error in saving in the DB");
                }
            }
        }
    } catch(err) {
        return res.status(500).send("Server Error");
    }
});

module.exports = router;