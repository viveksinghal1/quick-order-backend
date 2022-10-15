const express = require("express");
let router = express.Router();
const Product = require("../models/product");
const middleware = require('../middleware/index');

router.get('/', middleware.verifyToken, async function(req, res){
    try {
        let products = await Product.find({});
        if (products.length==0) {
            let result = await seedDB();
            products = await Product.find({});
        }
        res.status(200).send(products);
    } catch(err) {
        res.status(500).send("Server Error");
    }
});

router.get('/:id', middleware.verifyToken, async function(req, res){
    try {
        let product = await Product.find({id: req.params.id});
        if (product==null) {
            res.status(404).send("Product not found")
        }
        res.status(200).send(product);
    } catch(err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;