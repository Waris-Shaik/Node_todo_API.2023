const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const { isAuthenticated } = require('../middlewares/auth');


router.post('/new', isAuthenticated, taskController.newTask)
router.get('/my', isAuthenticated, taskController.getMyTasks);
router.route('/:id').get(isAuthenticated,taskController.getTaskById).put(isAuthenticated,taskController.updateTask).delete(isAuthenticated,taskController.deleteTask)

 
exports.router = router;