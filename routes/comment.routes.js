
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/video/:videoId", commentController.getByVideoId);


router.post("/", authMiddleware, commentController.create);
router.put("/:id", authMiddleware, commentController.update);
router.delete("/:id", authMiddleware, commentController.remove);

module.exports = router;