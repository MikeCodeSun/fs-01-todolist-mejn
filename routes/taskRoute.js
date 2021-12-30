const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  getOneTask,
  deleteTask,
  updateTask,
} = require("../controller/taskController");

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getOneTask).delete(deleteTask).patch(updateTask);

module.exports = router;
