// Test untuk middleware error handler
// File ini menguji apakah middleware untuk handle error berfungsi

const {
  notFound,
  errorHandler,
} = require("../../src/middlewares/errorHandler");

describe("Error Handler Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    // Mock request object
    req = {
      originalUrl: "/api/test",
      method: "GET",
    };

    // Mock response object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock next function
    next = jest.fn();

    // Bersihkan mock
    jest.clearAllMocks();
  });

  describe("notFound middleware", () => {
    test("harus menangani route yang tidak ditemukan", () => {
      // Jalankan middleware
      notFound(req, res, next);

      // Test response langsung (tidak menggunakan next)
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Halaman /api/test tidak ditemukan",
      });
    });

    test("harus menyertakan informasi URL yang benar", () => {
      // Ubah data request
      req.originalUrl = "/api/todos/999";

      // Jalankan middleware
      notFound(req, res, next);

      // Test response
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Halaman /api/todos/999 tidak ditemukan",
      });
    });
  });

  describe("errorHandler middleware", () => {
    test("harus menangani error umum", () => {
      // Mock error
      const error = new Error("Test error");

      // Jalankan middleware
      errorHandler(error, req, res, next);

      // Test response (sesuai implementasi asli)
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Test error",
      });
    });

    test("harus menangani error dengan statusCode khusus", () => {
      // Mock error dengan statusCode
      const error = new Error("Not found error");
      error.statusCode = 404;

      // Jalankan middleware
      errorHandler(error, req, res, next);

      // Test response
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Not found error",
      });
    });

    test("harus menggunakan default message jika tidak ada", () => {
      // Mock error tanpa message
      const error = new Error();
      error.message = "";

      // Jalankan middleware
      errorHandler(error, req, res, next);

      // Test response dengan default message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Internal Server Error",
      });
    });
  });
});
