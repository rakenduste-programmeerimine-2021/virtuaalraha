const Coin = require('../models/Coin')

exports.getCoins = async (req, res) => {
    const coins = await Coin.find({})

    res.status(200).send(coins)
}

exports.createCoin = async (req, res) => {
    const {coinName} = req.body

    const newCoin = {
        coinName,
        coinPrice: 1,
        coin24h: 1,
        coin7d: 1,
        coin30d: 1
    }
    const createdCoin = new Coin(newCoin)
    

    const savedCoin = await createdCoin.save()

    res.status(200).send(savedCoin)
}

exports.updateCoin = async (req, res) => {
    const { coin, price, _24h, _7d, _30d } = req.body;

    // const coins = await Coin.findById(coinName)
    console.debug(coin, price, _24h, _7d, _30d)
    const coins = await Coin.findOneAndUpdate( { coinName: coin }, { 
        coinPrice: price,
        coin24h : _24h,
        coin7d : _7d,
        coin30d : _30d
    },{
        new: true
    })
    console.debug(coins)
    const savedCoin = await coins.save()

    res.status(200).send(savedCoin) 
}


exports.deleteCoin = async (req, res) => {
    const { id } = req.params;

    const coin = await Coin.findOneAndDelete({ _id: id })

    if (!coin) res.status(404).send("No coin with that id found")

    res.status(200).send(`Successfully deleted the following coin: \n ${coin}`)
}
