const { ErrorHandler } = require('../middlewares/error');
const model = require('../models/task');
const Task = model.Task;


exports.newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({ title, description, user: req.user });
        res.status(201).json({ success: true, message: "Task Created Successfully..." })
    } catch (error) {
        next(error)
    }
}


exports.getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({ success: true, tasks })
    } catch (error) {
        next(error);
    }
}

exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandler("Task Not Found", 404));
        res.status(200).json({ success: true, task });
    } catch (error) {
        next(error);
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandler("Task Not Found", 404))

        task.isCompleted = !task.isCompleted;
        await task.save()

        res.status(200).json({ success: true, message: "Task Updated Successfully..." });
    } catch (error) {
        next(error)
    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandler("Task Not Found", 404))
        task.deleteOne();
        res.status(200).json({ success: true, message: "Task Deleted Successfully..." })
    } catch (error) {
        next(error);
    }
}