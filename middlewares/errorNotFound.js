const errorNotFound = (res, req, next) => {
  const error = new Error("This page does not exist");
  error.status = 404;

  next(error);
};

export default errorNotFound;
