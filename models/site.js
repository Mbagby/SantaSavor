var mongoose = require("mongoose");

var siteSchema = new mongoose.Schema({
  address: String,
  lat: { type: Number, required: true, min: -90.0, max: 90.0},
  long: { type: Number, required: true, min: -180.0, max: 180.0 }
});

var Site = mongoose.model("Site", siteSchema);

module.exports = Site;