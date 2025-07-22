
const express = require("express");
const router = express.Router();
const WatchlistController = require("../controllers/watchlist.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, WatchlistController.getMyList);
router.post("/", authMiddleware, WatchlistController.add);
router.delete("/", authMiddleware, WatchlistController.remove);

module.exports = router;