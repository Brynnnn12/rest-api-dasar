require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to REST API Dasar",
    status: "success",
  });
});

app.use("/api/todos", require("./routes/todo"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
