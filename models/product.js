const mongoose = require("mongoose");

const prodSchema = mongoose.Schema({
    name: String,
    image: String,
    price: String,
    desc: String,
    inStock: Boolean
});

module.exports = mongoose.model("Product", prodSchema);