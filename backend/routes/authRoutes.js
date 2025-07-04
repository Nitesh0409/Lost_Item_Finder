const express = require("express");
const { body } = require("express-validator");

const userController = require("../controllers/authControllers");
const { userValidation } = require("../validators/userValidation");
const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", userValidation, userController.signup );

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ],
    userController.login
);  

router.get("/getUser/:id", userController.getUser);

router.get("/profile",authenticateUser,userController.getProfile);

module.exports = router;
  