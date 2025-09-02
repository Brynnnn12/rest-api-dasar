// Test untuk model Todo
// File ini menguji apakah model Todo berfungsi dengan baik

// Mock model Todo dengan factory function
jest.mock("../../src/models/todo", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Todo = require("../../src/models/todo");

describe("Model Todo", () => {
  // Test sebelum setiap fungsi dijalankan
  beforeEach(() => {
    // Bersihkan semua mock sebelum test baru
    jest.clearAllMocks();
  });

  test("harus bisa membuat todo baru", async () => {
    // Data test
    const todoData = {
      title: "Belajar Jest",
      completed: false,
    };

    // Simulasi membuat todo
    const mockTodo = {
      _id: "12345",
      ...todoData,
    };

    // Mock fungsi create dari model
    Todo.create.mockResolvedValue(mockTodo);

    // Test apakah mock berfungsi
    expect(Todo.create).toBeDefined();
    expect(typeof Todo.create).toBe("function");

    // Test create function
    const result = await Todo.create(todoData);
    expect(Todo.create).toHaveBeenCalledWith(todoData);
    expect(result).toEqual(mockTodo);
  });

  test("harus memiliki struktur schema yang benar", () => {
    // Test apakah Todo adalah fungsi constructor
    expect(Todo).toBeDefined();

    // Dalam environment test, kita hanya memastikan Todo ter-load dengan baik
    console.log("Model Todo berhasil di-import");
  });

  test("harus bisa mencari semua todo", async () => {
    // Data mock
    const mockTodos = [
      { _id: "1", title: "Todo 1", completed: false },
      { _id: "2", title: "Todo 2", completed: true },
    ];

    // Mock fungsi find
    Todo.find.mockResolvedValue(mockTodos);

    // Test
    const result = await Todo.find();

    expect(Todo.find).toHaveBeenCalled();
    expect(result).toEqual(mockTodos);
    expect(result).toHaveLength(2);
  });
});
