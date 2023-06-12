// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];
//   if (title == null) {
//     res.status(422).send("The field 'title' is required");
//     errors.push({ field: "error", message: "title is missing" });
//   } else if (title.length > 255) {
//     errors.push({
//       field: "title",
//       message: "Should contain less than 255 characters",
//     });
//   } else if (director == null) {
//     errors.push({ field: "director", message: "This field is required" });
//   } else if (year == null) {
//     errors.push({ field: "year", message: "This field is required" });
//   } else if (color == null) {
//     errors.push({ field: "color", message: "This field is required" });
//   } else if (duration == null) {
//     errors.push({ field: "duration", message: "This field is required" });
//   } else if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// const { body, validationResult } = require('express-validator');

// const validateMovie = [
//     body("title").isLength({ max: 255 }),
//     body("director").isLength({ max: 255 }),
//     body("year").isLength({ max: 4 }),
//     body("color").isLength({max:50}),
//     body("duration").isLength({max:100}),
//     (req, res, next) => {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         res.status(422).json({ validationErrors: errors.array() });
//       } else {
//         next();
//       }
//     },
//   ];

const Joi = require("joi");
const userSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().max(4).required(),
  color: Joi.string().max(50).required(),
  duration: Joi.number().max(100).required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = userSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateUser = [
//   body("email").isEmail(),
//   body("firstname").isLength({ max: 255 }),
//   body("lastname").isLength({ max: 255 }),
//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(422).json({ validationErrors: errors.array() });
//     } else {
//       next();
//     }
//   },
];

module.exports = {
  validateMovie,
  validateUser,
};
