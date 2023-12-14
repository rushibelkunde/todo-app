const pool = require('../configs/db');

module.exports.getSubTodos = async (req, res) => {
    try {
        const userId = req.userId;
        const todoId = req.params.todoId; // Assuming you pass todoId in the URL

        const query = {
            text: 'SELECT * FROM subTodos WHERE user_id = $1 AND todo_id = $2 ORDER BY created_at DESC',
            values: [userId, todoId],
        };

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.addSubTodo = async (req, res) => {
    try {
        const { title, todoId } = req.body;
        const userId = req.userId;

        const query = {
            text: 'INSERT INTO subTodos(user_id, todo_id, title, completed) VALUES($1, $2, $3, false)',
            values: [userId, todoId, title],
        };

        await pool.query(query);
        res.json({ message: "SubTodo added successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.deleteSubTodo = async (req, res) => {
    try {
        const subTodoId = req.params.id;

        const query = {
            text: 'DELETE FROM subTodos WHERE id = $1',
            values: [subTodoId],
        };

        await pool.query(query);
        res.json({ message: "SubTodo deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.toggleSubTodo = async (req, res) => {
    try {
        const subTodoId = req.params.id;

        const query = {
            text: 'UPDATE subTodos SET completed = NOT completed WHERE id = $1',
            values: [subTodoId],
        };

        await pool.query(query);
        res.json({ message: "SubTodo toggled successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};