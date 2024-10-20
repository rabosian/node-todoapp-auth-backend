const express = require("express")
const taskController = require("../controller/task.controller")
const CommentController = require("../controller/comment.controller")
const authController = require("../controller/auth.controller")
const router = express.Router()

router.post('/', authController.authenticate, taskController.createTask)
router.get('/', taskController.getAllTasks)
router.put('/:id/status', taskController.updateTaskStatus)
router.put('/:id/name', taskController.updateTaskName)
router.delete('/:id', taskController.deleteTask)

// comments controller
router.post('/:taskId/comments', CommentController.addCommentToTask)
router.get('/:taskId/comments', CommentController.getAllComments)
router.delete('/:taskId/comments/:commentId', CommentController.deleteComment)

module.exports = router;