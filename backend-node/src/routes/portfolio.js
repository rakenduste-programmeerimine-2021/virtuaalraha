const router = require("express").Router()
const portfolioController = require("../controllers/portfolio")
const jwtAuth = require("../middleware/jwtAuth")

router.use(jwtAuth);
router.get("/", portfolioController.getPortfolio)
router.get("/portfolios", portfolioController.getUserPortfolio)
router.post("/create", portfolioController.createPortfolio)
router.put("/update/:id", portfolioController.updatePortfolio)
router.delete("/delete", portfolioController.deletePortfolio)


module.exports = router