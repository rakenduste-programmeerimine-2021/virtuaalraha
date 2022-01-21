const { Schema, model } = require('mongoose')

const portfolioSchema = new Schema({
  coinOwnerId: { type: String, required: true },
  coinName: { type: String, required: true },
  coinAmount: { type: Number, required: true},
  createdAt: { type: Date, default: Date.now }
});

const Portfolio = model("Portfolio", portfolioSchema)

module.exports = Portfolio