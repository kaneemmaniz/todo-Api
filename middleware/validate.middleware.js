// middleware/validate.middleware.js
const validate = (schema) => (req, res, next) => {
  try {
    // Validate body if schema has body rules
    if (schema && req.body) {
      schema.parse(req.body);
    }

    // For ID validation, we'll handle it separately for now
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }
    next(error);
  }
};

module.exports = validate;