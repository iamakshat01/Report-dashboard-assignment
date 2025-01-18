module.exports = {
  ...require("./files"),
};

module.exports.errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || "Something went wrong.",
    },
  });
};
