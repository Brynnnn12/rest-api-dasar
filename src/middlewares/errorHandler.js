/**
 * middleware ini berfungsi untuk menangani error pada aplikasi
 *
 */

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    status: "error",
  });
};

/**
 * middleware ini berfungsi untuk menangani request yang tidak ditemukan
 */
exports.notFound = (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    status: "error",
  });
};
