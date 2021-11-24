const Portfolio = require('../models/Portfolio')

exports.getPortfolio = async (req, res) => {
    const portfolio = await Portfolio.find({})

    res.status(200).send(portfolio)
}

exports.createPortfolio = async (req, res) => {
    const { coinOwnerId, coinId, coinAmount, coinCurrentValue } = req.body

    const newPortfolio = {
        coinOwnerId,
        coinId,
        coinAmount,
        coinCurrentValue

    }
    const createdPortfolio = new Portfolio(newPortfolio)

    const savedPortfolio = await createdPortfolio.save()

    res.status(200).send(savedPortfolio)
}

exports.deletePortfolio = async (req, res) => {
    const { id } = req.params;

    const portfolio = await Portfolio.findOneAndDelete({ _id: id })

    if (!portfolio) res.status(404).send("No portfolio with that id found")

    res.status(200).send(`Successfully deleted the following portfolio: \n ${portfolio}`)
}

exports.updatePortfolio = async (req, res) => {
    const { id } = req.params;

    const portfolio = await Portfolio.findOneAndUpdate({ _id: id }, req.body)

    if (!portfolio) res.status(404).send("No portfolio with that id found")

    const updatedPortfolio = await Portfolio.findOne({ _id: id })

    res.status(200).send(`Successfully updated the following portfolio: \n ${updatedPortfolio}`)
}