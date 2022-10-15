const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
dotenv.config();

const url = process.env.DATABASEURL || "mongodb://localhost:27017/quick_order";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("mongoDB connected at port 27017"))
.catch(err=>console.log("MongoDB Error: " + err.message));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/orders/", orderRoutes);

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
    console.log("Server started at port: 3000");
});