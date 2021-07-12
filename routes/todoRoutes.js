const { Router } = require('express')
const requireAuth = require('../middleware/authMiddleware')
const router = Router()

const todoController = require('../controller/todoController')
router.get('/', requireAuth, todoController.todo_get)
router.post('/add', requireAuth, todoController.todo_post)
router.post('/delete/?', requireAuth, todoController.todo_delete)

module.exports = router