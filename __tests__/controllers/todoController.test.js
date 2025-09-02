// Test untuk controller Todo
// File ini menguji semua fungsi di todoController

// Mock model Todo dengan factory function
jest.mock("../../src/models/todo", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const todoController = require("../../src/controllers/todoController");
const Todo = require("../../src/models/todo");

describe("Todo Controller", () => {
  let req, res;

  // Setup sebelum setiap test
  beforeEach(() => {
    // Mock request object
    req = {
      body: {},
      params: {},
    };

    // Mock response object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Bersihkan semua mock
    jest.clearAllMocks();
  });

  describe("index - Mengambil semua todo", () => {
    test("harus berhasil mengambil daftar todo", async () => {
      // Data mock
      const mockTodos = [
        { _id: "1", title: "Belajar Node.js", completed: false },
        { _id: "2", title: "Belajar Jest", completed: true },
      ];

      // Mock fungsi find
      Todo.find.mockResolvedValue(mockTodos);

      // Jalankan fungsi
      await todoController.index(req, res);

      // Test
      expect(Todo.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Berhasil mengambil daftar todo",
        data: mockTodos,
      });
    });

    test("harus menangani error saat mengambil todo", async () => {
      // Mock error
      const errorMessage = "Database error";
      Todo.find.mockRejectedValue(new Error(errorMessage));

      // Jalankan fungsi
      await todoController.index(req, res);

      // Test
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Gagal mengambil daftar todo",
        error: errorMessage,
      });
    });
  });

  describe("store - Membuat todo baru", () => {
    test("harus berhasil membuat todo baru", async () => {
      // Data input
      req.body = {
        title: "Todo baru",
        completed: false,
      };

      // Data mock hasil
      const mockNewTodo = {
        _id: "123",
        title: "Todo baru",
        completed: false,
      };

      // Mock fungsi create
      Todo.create.mockResolvedValue(mockNewTodo);

      // Jalankan fungsi
      await todoController.store(req, res);

      // Test
      expect(Todo.create).toHaveBeenCalledWith({
        title: "Todo baru",
        completed: false,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Todo berhasil dibuat",
        data: mockNewTodo,
      });
    });

    test("harus menangani error saat membuat todo", async () => {
      // Data input
      req.body = {
        title: "Todo baru",
      };

      // Mock error
      Todo.create.mockRejectedValue(new Error("Validation error"));

      // Jalankan fungsi
      await todoController.store(req, res);

      // Test
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Gagal membuat todo",
        error: "Validation error",
      });
    });
  });

  describe("update - Mengupdate todo", () => {
    test("harus berhasil mengupdate todo", async () => {
      // Data input
      req.params.id = "123";
      req.body = {
        title: "Todo diupdate",
        completed: true,
      };

      // Data mock hasil
      const mockUpdatedTodo = {
        _id: "123",
        title: "Todo diupdate",
        completed: true,
      };

      // Mock fungsi findByIdAndUpdate
      Todo.findByIdAndUpdate.mockResolvedValue(mockUpdatedTodo);

      // Jalankan fungsi
      await todoController.update(req, res);

      // Test
      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        { title: "Todo diupdate", completed: true },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Todo berhasil diperbarui",
        data: mockUpdatedTodo,
      });
    });

    test("harus menangani todo yang tidak ditemukan", async () => {
      // Data input
      req.params.id = "999";
      req.body = {
        title: "Todo tidak ada",
      };

      // Mock return null (todo tidak ditemukan)
      Todo.findByIdAndUpdate.mockResolvedValue(null);

      // Jalankan fungsi
      await todoController.update(req, res);

      // Test
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Todo tidak ditemukan",
      });
    });
  });

  describe("destroy - Menghapus todo", () => {
    test("harus berhasil menghapus todo", async () => {
      // Data input
      req.params.id = "123";

      // Data mock hasil
      const mockDeletedTodo = {
        _id: "123",
        title: "Todo dihapus",
        completed: false,
      };

      // Mock fungsi findByIdAndDelete
      Todo.findByIdAndDelete.mockResolvedValue(mockDeletedTodo);

      // Jalankan fungsi
      await todoController.destroy(req, res);

      // Test
      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Todo berhasil dihapus",
      });
    });

    test("harus menangani todo yang tidak ditemukan saat menghapus", async () => {
      // Data input
      req.params.id = "999";

      // Mock return null (todo tidak ditemukan)
      Todo.findByIdAndDelete.mockResolvedValue(null);

      // Jalankan fungsi
      await todoController.destroy(req, res);

      // Test
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Todo tidak ditemukan",
      });
    });
  });
});
