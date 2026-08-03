const express = require("express");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication APIs
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: Himanshu }
 *               email: { type: string, example: himanshu@gmail.com }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Send OTP for password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: OTP sent to email
 */

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password with OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp, newPassword]
 *             properties:
 *               email: { type: string }
 *               otp: { type: string, example: "483921" }
 *               newPassword: { type: string, example: "new123456" }
 *     responses:
 *       200:
 *         description: Password reset successfully
 */

const {
    signup,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/userController");

const validate = require("../middleware/validate");
const {
    signupSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} = require("../validators/userValidator");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

module.exports = router;
