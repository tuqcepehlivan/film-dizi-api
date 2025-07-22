
const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, ratingController.rateOrUpdate);
router.delete("/", authMiddleware, ratingController.remove);
router.get("/video/:videoId", ratingController.getVideoAverage);

module.exports = router;