
const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorite.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, favoriteController.add);
router.delete("/", authMiddleware, favoriteController.remove);
router.get("/", authMiddleware, favoriteController.getMyFavorites);

module.exports = router;
