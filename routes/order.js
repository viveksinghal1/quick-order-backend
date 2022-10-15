const express = require("express");
let router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const middleware = require('../middleware/index');

router.get('/:id', middleware.verifyToken, async function(req, res){
    try {
        let user = await Order.find({email: req.query.email});
        if (user == null) {
            res.status(200).send(null);
        }
        let order = await Order.find({product: req.query.product, buyer: user.id});
        if (order==null) {
            res.status(200).send(null)
        }
        res.status(200).send(order);
    } catch(err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;