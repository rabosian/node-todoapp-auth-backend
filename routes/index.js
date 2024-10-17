const express = require("express")
const router = express.Router()
const taskAPI = require("./tasks.api")
const commentAPI = require("./comments.api")

router.use('/tasks', taskAPI)
router.use('/comments', commentAPI)

module.exports = router
