const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  phone: String
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
