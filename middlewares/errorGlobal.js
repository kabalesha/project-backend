const errorGlobal = (error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something, went wrong, please try again later",
  });
};

export default errorGlobal;
