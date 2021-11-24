const Coin = require('../models/Coin')

exports.getCoins = async (req, res) => {
    const coins = await Coin.find({})

    res.status(200).send(coins)
}

exports.createCoin = async (req, res) => {
    const {coinName, coinTicker, coinImage, coinAddress } = req.body

    const newCoin = {
        coinName, 
        coinTicker, 
        coinImage, 
        coinAddress,
    }
    const createdCoin = new Coin(newCoin)

    const savedCoin = await createdCoin.save()

    res.status(200).send(savedCoin)
}

exports.deleteCoin = async (req, res) => {
    const { id } = req.params;

    const coin = await Coin.findOneAndDelete({ _id: id })

    if (!coin) res.status(404).send("No coin with that id found")

    res.status(200).send(`Successfully deleted the following coin: \n ${coin}`)
}
