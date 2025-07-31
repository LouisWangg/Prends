module.exports = (err, req, res, next) => {
  console.error("🔥 Error: ", err.stack);

  const statusCode = err.status || 500;
  const message = err.message || "Error pada server";
  const type = err.type || "GENERAL";
  const errorCode = err.errorCode || "INTERNAL_ERROR";

  res.status(statusCode).json({
    success: false,
    message,
    type,
    errorCode,
  });
};
