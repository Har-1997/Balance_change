const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 400).json({ error: err.message });
};

module.exports = errorHandler;