const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const { protect, admin } = require('../middleware/authMiddleware');

router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('user', 'name email');
    } else {
      tasks = await Task.find({ user: req.user.id });
    }
    res.status(200).json(tasks);
  })
);

router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400);
      throw new Error('Please add a title');
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.user.id,
    });

    res.status(200).json(task);
  })
);

router.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  })
);

router.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
  })
);

module.exports = router;
