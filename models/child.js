var mongoose = require("mongoose");

var childSchema = new mongoose.Schema({
  name: String,
  age: Number,
  needs: Array,
  clothing: String,
  shoe: String,
  interests: Array,
  site: String,
  santa: String,
  contactId: String,
});

var Child = mongoose.model("Child", childSchema);

module.exports = Child;