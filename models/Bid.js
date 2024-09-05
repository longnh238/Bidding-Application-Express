const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bid = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = Bid;
