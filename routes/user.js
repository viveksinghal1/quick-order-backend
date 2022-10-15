const express = require("express");
let router = express.Router();
const User = require("../models/user");
const middleware = require("../middleware/index");

router.get("/:id", middleware.verifyToken, async function(req, res){
    try {
        let user = await User.findOne({email: req.params.email}).populate("orders");
        
        if (user===null) {
            res.status(404).send("User not found");
        } else {
            
            res.status(200).json({
                user: user
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Server Error");
    }

});

module.exports = router;