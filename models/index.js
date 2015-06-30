var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/santa_savor");

mongoose.set("debug", true);

module.exports.Child = require("./child");
module.exports.Site = require("./site");
module.exports.User = require("./user");