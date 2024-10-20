const express = require("express")
const router = express.Router()
const taskAPI = require("./tasks.api")
const userAPI = require("./users.api")

router.use('/tasks', taskAPI)

router.use('/users', userAPI)

module.exports = router
