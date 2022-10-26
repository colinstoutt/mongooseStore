const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const productController = require("./controllers/products");

//-=-dotenv-=-
require("dotenv").config();
const PORT = process.env.PORT;
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// -=-middleware-=-
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use("/products", productController);

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("Mongo Connected"));
db.on("disconnected", () => console.log("Mongo Disconnected"));

// -=-listener-=-
app.listen(PORT, () => {
  console.log("store is online");
});
