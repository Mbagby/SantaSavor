var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/santa_savor");

module.exports.Child = require("./child");
module.exports.User = require("./user");