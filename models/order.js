const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isCancelled: Boolean 
});

module.exports = mongoose.model("Order", orderSchema);