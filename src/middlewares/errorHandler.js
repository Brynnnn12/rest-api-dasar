/**
 * middleware ini berfungsi untuk menangani error pada aplikasi
 * middleware ini akan mengembalikan response dengan status error dan pesan error yang sesuai
 */

exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

/**
 * middleware ini berfungsi untuk menangani request yang tidak ditemukan
 */
exports.notFound = (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Halaman ${req.originalUrl} tidak ditemukan`,
  });
};
