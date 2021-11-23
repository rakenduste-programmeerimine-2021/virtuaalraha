const router = require("express").Router()
const portfolioController = require("../controllers/portfolio")

router.get("/", portfolioController.getPortfolio)
router.post("/create", portfolioController.createPortfolio)
router.put("/update/:id", portfolioController.updatePortfolio)
router.delete("/delete/:id", portfolioController.deletePortfolio)

module.exports = router