const mongoose = require("mongoose");
const Bid = require("./Bid");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String },
  image: { type: String, required: true },
  bids: [Bid],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
