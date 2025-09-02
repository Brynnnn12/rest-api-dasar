// Setup file untuk test
// File ini akan dijalankan sebelum test dimulai

// Mock mongoose agar tidak perlu koneksi database asli
jest.mock("mongoose", () => ({
  connect: jest.fn(),
  model: jest.fn(),
  Schema: jest.fn(),
}));

// Set timeout untuk test
jest.setTimeout(30000);

console.log("Test setup selesai - Database dimock untuk pembelajaran");
