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
productRouter.get("/new", (req, res) => {
  res.render("new.ejs", {
    tabTitle: "New",
  });
});
// -=-delete-=-
productRouter.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    res.redirect("/products");
  });
});
// -=-update-=-
// -=-create-=-
productRouter.post("/", (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect("/products");
  });
});
// -=-edit-=-
// -=-show-=-
productRouter.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", {
      product: foundProduct,
      tabTitle: foundProduct.name,
    });
  });
});

productRouter.get("/seed", (req, res) => {
  Product.deleteMany({}, (error, allBooks) => {});
  Product.create(productSeed, (error, data) => {
    res.redirect("/products");
  });
});

module.exports = productRouter;
