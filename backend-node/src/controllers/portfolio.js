const Portfolio = require('../models/Portfolio')

exports.getPortfolio = async (req, res) => {
    const portfolio = await Portfolio.find({})

    res.status(200).send(portfolio)
}

exports.getUserPortfolio = async (req, res) => {

    console.debug(req.user)
    const { userId } = req.user.id
    console.debug(req.user.id)

    const portfolios = await Portfolio.find({ coinOwnerId: req.user.id})

    res.status(200).send(portfolios)

}

exports.createPortfolio = async (req, res) => {
    const { coinOwnerId, coinName, coinAmount } = req.body

    const newPortfolio = {
        coinOwnerId,
        coinName,
        coinAmount
    }

    const createdPortfolio = new Portfolio(newPortfolio)

    const savedPortfolio = await createdPortfolio.save()

    res.status(200).send(savedPortfolio)
}

exports.deletePortfolio = async (req, res) => {
    const { ownerId, name  } = req.body;

    const portfolio = await Portfolio.findOneAndDelete({ coinOwnerId: ownerId, coinName: name  })

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