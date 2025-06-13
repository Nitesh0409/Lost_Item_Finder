const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const { userName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("user already exist with email");
            error.statusCode = 409;  //for conflict
            error.errors = [{ msg: 'email already in use', param: 'email' }];
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        console.log("new use saved");
        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);   
    }
}


exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found with this email");
            error.statusCode = 401;
            return next(error);
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            return next(error);
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "fallback_secret_key",
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        // 4. Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
            }
        });

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("user not Found");
            error.statusCode = 400;
            return next(error);
        }

        res.status(200).json({ user });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}