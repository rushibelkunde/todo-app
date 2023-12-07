const pool = require('../configs/db');

module.exports.getTodos = async (req, res) => {
    try {
        const userId = req.userId;
        const query = {
            text: 'SELECT * FROM todos WHERE user_id = $1',
            values: [userId],
        };

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.addTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId;

        const query = {
            text: 'INSERT INTO todos(user_id, title, completed) VALUES($1, $2, false)',
            values: [userId, title],
        };

        await pool.query(query);
        res.json({ message: "Todo added successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const query = {
            text: 'DELETE FROM todos WHERE id = $1',
            values: [todoId],
        };

        await pool.query(query);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.toggleTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const query = {
            text: 'UPDATE todos SET completed = NOT completed WHERE id = $1',
            values: [todoId],
        };

        await pool.query(query);
        res.json({ message: "Todo toggled successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};
