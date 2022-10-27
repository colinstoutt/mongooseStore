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
productRouter.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedProduct) => {
      res.redirect(`/products/${req.params.id}`);
    }
  );
});
// -=-buy-=-
// productRouter.put("/:id", (req, res) => {
//   Product.findOneAndUpdate(
//     { qty },
//     { qty: (qty -= 1) },
//     (err, updatedProduct) => {
//       res.redirect(`/products/${req.params.id}`);
//     }
//   );
// });
// -=-create-=-
productRouter.post("/", (req, res) => {
  Product.create(req.body, (err, createdProduct) => {
    res.redirect("/products");
  });
});
// -=-edit-=-
productRouter.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("edit.ejs", {
      product: foundProduct,
      index: req.params.id,
      tabTitle: "Edit",
    });
  });
});
// -=-show-=-
productRouter.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", {
      product: foundProduct,
      tabTitle: foundProduct.name,
    });
  });
});
// -=-seed-=-
productRouter.get("/seed", (req, res) => {
  Product.deleteMany({}, (err, allBooks) => {});
  Product.create(productSeed, (err, data) => {
    res.redirect("/products");
  });
});

module.exports = productRouter;
