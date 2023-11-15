import HttpError from "../middlewares/httpError.js";
import * as yup from "yup";

const validateBodyAuth = (schema) => {
  return (req, res, next) => {
    try {
      schema.validateSync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      return next(HttpError(400, `${error.errors.join(", ")}`));
    }
  };
};

export default validateBodyAuth;
