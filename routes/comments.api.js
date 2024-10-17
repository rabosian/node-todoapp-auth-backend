const express = require("express")
const CommentController = require("../controller/comment.controller")
const router = express.Router()

// comments controller
router.put('/:id', CommentController.updateComment)
router.delete('/:id', CommentController.deleteComment)

module.exports = router;