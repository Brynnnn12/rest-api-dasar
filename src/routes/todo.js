const express = require("express");
const router = express.Router();
const {
  index,
  store,
  update,
  destroy,
} = require("../controllers/todoController");
router.route("/").get(index).post(store);

router.route("/:id").put(update).delete(destroy);

module.exports = router;
