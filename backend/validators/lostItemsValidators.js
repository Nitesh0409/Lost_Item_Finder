const { body } = require("express-validator");

exports.validateLostItem = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  // body("image")
  //   .optional()
  //   .isURL()
  //   .withMessage("Image must be a valid URL."),

  body("location")
    .optional()
    .isString()
    .withMessage("For now, location must be a string."),

  // body("tags")
  //   .optional()
  //   .isArray()
  //   .withMessage("Tags should be an array.")
  //   .bail() // stops validation chain if tags is not an array
  //   .custom((tags) => tags.every(tag => typeof tag === 'string'))
  //   .withMessage("Each tag must be a string."),

  body("dateLost")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date lost must be a valid date."),

  body("contactInfo")
    .optional()
    .isString()
    .withMessage("Contact info must be a string."),

  body("reward")
    .optional()
    .isNumeric()
    .withMessage("Reward must be a number."),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string."),
];
