const { Schema, model } = require('mongoose')

const coinSchema = new Schema({
  coinName: { type: String, required: true },
  coinPrice: { type: Number, default: 1},
  coin24h : { type: Number, default: 1 },
  coin7d : { type: Number, default: 1 },
  coin30d : { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});
 
const Coin = model("Coin", coinSchema)

module.exports = Coin