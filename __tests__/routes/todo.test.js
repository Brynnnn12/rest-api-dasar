// Test untuk routes Todo
// File ini menguji apakah endpoint API berfungsi dengan baik

const request = require("supertest");
const express = require("express");

// Mock model Todo dengan factory function
jest.mock("../../src/models/todo", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const todoRoutes = require("../../src/routes/todo");
const Todo = require("../../src/models/todo");
const { errorHandler } = require("../../src/middlewares/errorHandler");

// Setup aplikasi express untuk testing
const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use(errorHandler);

describe("Todo Routes (API Endpoints)", () => {
  beforeEach(() => {
    // Bersihkan semua mock sebelum setiap test
    jest.clearAllMocks();
  });

  describe("GET /api/todos", () => {
    test("harus berhasil mengambil semua todo", async () => {
      // Data mock
      const mockTodos = [
        { _id: "1", title: "Belajar Express", completed: false },
        { _id: "2", title: "Belajar Testing", completed: true },
      ];

      // Mock fungsi find
      Todo.find.mockResolvedValue(mockTodos);

      // Kirim request
      const response = await request(app).get("/api/todos").expect(200);

      // Test response
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Berhasil mengambil daftar todo");
      expect(response.body.data).toEqual(mockTodos);
      expect(response.body.data).toHaveLength(2);
    });

    test("harus menangani error saat mengambil todo", async () => {
      // Mock error
      Todo.find.mockRejectedValue(new Error("Database connection failed"));

      // Kirim request
      const response = await request(app).get("/api/todos").expect(500);

      // Test response
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Gagal mengambil daftar todo");
    });
  });

  describe("POST /api/todos", () => {
    test("harus berhasil membuat todo baru", async () => {
      // Data input
      const newTodo = {
        title: "Todo dari API test",
        completed: false,
      };

      // Data mock hasil
      const mockCreatedTodo = {
        _id: "123",
        ...newTodo,
      };

      // Mock fungsi create
      Todo.create.mockResolvedValue(mockCreatedTodo);

      // Kirim request
      const response = await request(app)
        .post("/api/todos")
        .send(newTodo)
        .expect(201);

      // Test response
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Todo berhasil dibuat");
      expect(response.body.data.title).toBe(newTodo.title);
      expect(response.body.data.completed).toBe(newTodo.completed);
    });

    test("harus menangani error validasi", async () => {
      // Data input tidak valid (tanpa title)
      const invalidTodo = {
        completed: false,
      };

      // Mock error validasi
      Todo.create.mockRejectedValue(new Error("Title is required"));

      // Kirim request
      const response = await request(app)
        .post("/api/todos")
        .send(invalidTodo)
        .expect(500);

      // Test response
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Gagal membuat todo");
    });
  });

  describe("PUT /api/todos/:id", () => {
    test("harus berhasil mengupdate todo", async () => {
      // Data input
      const todoId = "123";
      const updateData = {
        title: "Todo diupdate via API",
        completed: true,
      };

      // Data mock hasil
      const mockUpdatedTodo = {
        _id: todoId,
        ...updateData,
      };

      // Mock fungsi findByIdAndUpdate
      Todo.findByIdAndUpdate.mockResolvedValue(mockUpdatedTodo);

      // Kirim request
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send(updateData)
        .expect(200);

      // Test response
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Todo berhasil diperbarui");
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.completed).toBe(updateData.completed);
    });

    test("harus menangani todo yang tidak ditemukan", async () => {
      // Data input
      const todoId = "999";
      const updateData = {
        title: "Todo tidak ada",
      };

      // Mock return null (tidak ditemukan)
      Todo.findByIdAndUpdate.mockResolvedValue(null);

      // Kirim request
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send(updateData)
        .expect(404);

      // Test response
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Todo tidak ditemukan");
    });
  });

  describe("DELETE /api/todos/:id", () => {
    test("harus berhasil menghapus todo", async () => {
      // Data input
      const todoId = "123";

      // Data mock hasil
      const mockDeletedTodo = {
        _id: todoId,
        title: "Todo akan dihapus",
        completed: false,
      };

      // Mock fungsi findByIdAndDelete
      Todo.findByIdAndDelete.mockResolvedValue(mockDeletedTodo);

      // Kirim request
      const response = await request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(200);

      // Test response
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Todo berhasil dihapus");
    });

    test("harus menangani todo yang tidak ditemukan saat menghapus", async () => {
      // Data input
      const todoId = "999";

      // Mock return null (tidak ditemukan)
      Todo.findByIdAndDelete.mockResolvedValue(null);

      // Kirim request
      const response = await request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(404);

      // Test response
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Todo tidak ditemukan");
    });
  });
});
