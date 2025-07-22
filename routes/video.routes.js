
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video.controller");
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/upload");


router.get("/", videoController.getAll);
router.get("/:id", videoController.getById);


router.post("/", authMiddleware, upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 }
]), videoController.create);


router.put("/:id", authMiddleware, videoController.update);
router.delete("/:id", authMiddleware, videoController.remove);

module.exports = router;