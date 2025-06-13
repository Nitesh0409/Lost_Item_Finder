const { body } = require("express-validator");

exports.validateFoundItem = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("images")
    .optional()
    .isString()
    .withMessage("Images must be a string URL.")
    .bail()
    .isURL()
    .withMessage("Image must be a valid URL."),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags should be an array.")
    .bail()
    .custom((tags) => tags.every(tag => typeof tag === "string"))
    .withMessage("Each tag must be a string."),

  // Validate GeoJSON location if present
  // body("location.type")
  //   .optional()
  //   .equals("Point")
  //   .withMessage('Location type must be "Point".'),

  // body("location.coordinates")
  //   .optional()
  //   .isArray({ min: 2, max: 2 })
  //   .withMessage("Coordinates must be an array of [longitude, latitude]."),

  // body("location.coordinates[0]")
  //   .optional()
  //   .isFloat({ min: -180, max: 180 })
  //   .withMessage("Longitude must be a valid number between -180 and 180."),

  // body("location.coordinates[1]")
  //   .optional()
  //   .isFloat({ min: -90, max: 90 })
  //   .withMessage("Latitude must be a valid number between -90 and 90."),
];
