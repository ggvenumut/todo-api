const Todo = require("../models/Todo");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTodos = asyncWrapper(async (req, res, next) => {
  const todos = await Todo.find({});
  res.status(200).json({ data: { todos } });
});

const createTodos = asyncWrapper(async (req, res, next) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
});

const getTodos = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOne({ _id: todoID });
  if (!todo) {
    return next(createCustomError(`No todo with id ${todoID}`, 404));
  }
  res.status(200).json({ todo });
});

const deleteTodos = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoID });
  if (!todo) {
    return next(createCustomError(`No todo with id ${todoID}`, 404));
  }
  res.status(200).json({ todo });
});

const updateTodos = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndUpdate({ _id: todoID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return next(createCustomError(`No todo with id ${todoID}`, 404));
  }
  res.status(200).json({ todo });
});

module.exports = {
  getAllTodos,
  createTodos,
  getTodos,
  updateTodos,
  deleteTodos,
};
