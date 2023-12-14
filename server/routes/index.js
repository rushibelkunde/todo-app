const express = require('express')

const router = express.Router()

const userController = require("../controllers/userController")
const todoController = require("../controllers/todoController")
const categoryController = require('../controllers/categoryController')
const subtodoController = require("../controllers/subtodoController")
const auth = require('../middlewares/auth')


router.get("/", auth.verifyToken, userController.getUsers )

// user routes
router.post('/register', userController.register)
router.post('/login', userController.login)

// Todos routes
router.get('/todos', auth.verifyToken, todoController.getTodos)
router.post('/addTodo', auth.verifyToken, todoController.addTodo)
router.delete('/deleteTodo/:id', auth.verifyToken, todoController.deleteTodo)
router.put('/toggleTodo/:id', auth.verifyToken, todoController.toggleTodo)

// catagory routes
router.get('/categories', auth.verifyToken, categoryController.getCategories);
router.post('/addCategory', auth.verifyToken, categoryController.addCategory);
router.delete('/deleteCategory/:id', auth.verifyToken, categoryController.deleteCategory);

// SubTodo routes
router.get('/subtodos/:todoId', auth.verifyToken, subtodoController.getSubTodos);
router.post('/addSubTodo', auth.verifyToken, subtodoController.addSubTodo);
router.delete('/deleteSubTodo/:id', auth.verifyToken, subtodoController.deleteSubTodo);
router.put('/toggleSubTodo/:id', auth.verifyToken, subtodoController.toggleSubTodo);


module.exports = router;