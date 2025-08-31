const Todo = require("../models/todo");

/**
 * mengambil daftar todo
 */
exports.index = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil daftar todo",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil daftar todo",
      error: error.message,
    });
  }
};

/**
 * menyimpan todo baru
 */
exports.store = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await Todo.create({ title, completed });
    res.status(201).json({
      status: "success",
      message: "Todo berhasil dibuat",
      data: todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal membuat todo",
      error: error.message,
    });
  }
};

/**
 * mengupdate todo yang ada
 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "Todo tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Todo berhasil diperbarui",
      data: todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui todo",
      error: error.message,
    });
  }
};

/**
 * menghapus todo yang ada
 */
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "Todo tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Todo berhasil dihapus",
      data: todo,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal menghapus todo",
      error: error.message,
    });
  }
};
