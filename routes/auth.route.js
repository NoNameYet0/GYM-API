const express = require("express");
const {login, changePassword, forgotPassword, verifyResetCode, resetPassword} = require("../controllers/auth/auth.controller.js");
const { authenticate } = require("../middlewares/authenticate.js");
const { loginValidation, changePasswordValidation, forgotPasswordValidation, verifyResetCodeValidation, resetPasswordValidation } = require("../utils/validators/auth.validator.js");

const router = express.Router();


router.post("/login" ,login);
router.put("/changePassword/:id", authenticate, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/verify", verifyResetCode);
router.put("/reset-password", resetPassword);


module.exports = router;