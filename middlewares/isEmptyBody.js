import HttpError from "../middlewares/httpError.js";

<<<<<<< HEAD
const isEmptyBody = (req, res, next) => {
    if(!Object.keys(req.body).length) {
        return next(HttpError(400, 'Missing fields')) 
      }
      next();
}

export default isEmptyBody;
=======
const IsEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, `Missing fields`));
  }

  next();
};

export default IsEmptyBody;
>>>>>>> main
