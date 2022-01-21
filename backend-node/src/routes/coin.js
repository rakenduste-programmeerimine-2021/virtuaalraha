const router = require("express").Router()
const coinController = require("../controllers/coin")

router.get("/", coinController.getCoins)
router.post("/create", coinController.createCoin)
router.put("/update", coinController.updateCoin)
// router.delete("/delete/:id", coinController.deleteCoin)

module.exports = router