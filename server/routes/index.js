const express = require('express')

const router = express.Router()

const userController = require("../controllers/userController")
const todoController = require("../controllers/todoController")

const auth = require('../middlewares/auth')


router.get("/", auth.verifyToken, userController.getUsers )

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/todos', auth.verifyToken, todoController.getTodos)

router.post('/addTodo', auth.verifyToken, todoController.addTodo)

router.delete('/deleteTodo/:id', auth.verifyToken, todoController.deleteTodo)

router.put('/toggleTodo/:id', auth.verifyToken, todoController.toggleTodo)


module.exports = router;