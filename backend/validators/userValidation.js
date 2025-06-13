const { body } = require('express-validator');

exports.userValidation = [
    body('userName')
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 3 }).withMessage('User name must be at least 3 characters'),

    // body('email')
    //     .notEmpty().withMessage('Email is required')
    //     .isEmail().withMessage('Invalid email format'),

    // body('password')
    //     .notEmpty().withMessage('Password is required')
    //     .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    //     .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    //     .withMessage('Password must contain at least one letter and one number'),
];
