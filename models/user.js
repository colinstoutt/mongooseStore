const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  shopping_cart: Array,
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
