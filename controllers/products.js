const express = require("express");
const productRouter = express.Router();
const Product = require("../models/products");
const productSeed = require("../models/seed");
// -=-index-=-
// '/' = '/products'
productRouter.get("/", (req, res) => {
  Product.find({}, (err, allProducts) => {
    res.render("index.ejs", {
      product: allProducts,
      tabTitle: "Home",
    });
  });
});
// -=-new-=-
// -=-delete-=-
// -=-update-=-
// -=-create-=-
// -=-edit-=-
// -=-show-=-

productRouter.get("/seed", (req, res) => {
  Product.deleteMany({}, (error, allBooks) => {});
  Product.create(productSeed, (error, data) => {
    res.redirect("/products");
  });
});

module.exports = productRouter;
