import HttpError from "../middlewares/httpError.js";

const IsEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, `Missing fields`));
  }

  next();
};

export default IsEmptyBody;
