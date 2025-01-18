const validate = (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      res.status(400).json( err.message );
    }
  };
  
  module.exports = validate;