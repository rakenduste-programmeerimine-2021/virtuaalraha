const { Schema, model } = require('mongoose')

const coinSchema = new Schema({
  coinName: { type: String, required: true },
  coinTicker: { type: String, required: true },
  coinImage: {type: String, required: true },
  coinAddress: {type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Coin = model("Coin", coinSchema)

module.exports = Coin