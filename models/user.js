const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
});

module.exports = mongoose.model("User", userSchema);