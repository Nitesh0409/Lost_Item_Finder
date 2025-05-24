const { body } = require("express-validator");

exports.validateLostItem = [
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("description").optional().isString(),
  body("images").optional().isURL().withMessage("Image must be a valid URL."),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags should be an array of strings."),
  body("location.type")
    .optional()
    .equals("Point")
    .withMessage('Location type must be "Point".'),
  body("location.coordinates")
    .optional()
    .isArray({ min: 2, max: 2 })
    .withMessage("Coordinates must be [longitude, latitude]."),
];
