const Task = require("../models/taskModel");
const asyncWrapper = require("../middleWare/asyncWrapper");
const { createError } = require("../error/customeError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res
    .status(200)
    .json({ success: true, tasks, msg: "successfully get all data" });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ success: true, task, msg: "successfully creat data" });
});

const getOneTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createError(`task with id: ${taskId} not found`, 404));
  }
  res.status(200).json({ success: true, task, msg: "successfully get data" });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createError(`not have id: ${taskId} item`, 404));
  }
  res
    .status(200)
    .json({ success: true, task, msg: "delete task successfully" });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return next(createError(`not have id: ${taskId} item`, 404));
  }
  res
    .status(200)
    .json({ success: true, task, msg: "update task successfully" });
});

module.exports = {
  getAllTasks,
  createTask,
  getOneTask,
  deleteTask,
  updateTask,
};
