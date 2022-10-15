const Product = require("./models/product");

const data = [
    {
        name: "Daredevil Glasses",
        price: "$300",
        desc: "Charlie Cox aka Matt Murdock glasses replica of offical Ray Ban",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        inStock: true
    },
    {
        name: "Dumbbells 10kg",
        price: "$250",
        desc: "Furnished dumbbells",
        image: "https://m.media-amazon.com/images/I/51DBPT89pfL._SL1123_.jpg",
        inStock: true
    },
    {
        name: "Samsung S22",
        price: "$1000",
        desc: "New 5G enabled dual Sim Slim Samsung S22",
        image: "https://m.media-amazon.com/images/I/8153wY04+qS._SY606_.jpg",
        inStock: false
    }
];

async function seedDB() {
    try {
        await Product.deleteMany({});
        data.forEach( async function(product){
            await Product.create(product);
        });
    } catch(err) {
        console.log(err);
    }
}

module.exports = seedDB;