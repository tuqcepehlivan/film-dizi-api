
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validations/userValidation");


router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);

router.get("/profile", authMiddleware, userController.profile);

module.exports = router;