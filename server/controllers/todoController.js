
const db = require('../configs/db')

module.exports.getTodos = (req, res) => {
    console.log("addtodo")
    const userId = req.userId;
    db.query(`SELECT * FROM todos WHERE user_id = ${userId}`, (err, data, fields) => {
        if (err) {
            return res.json({ message: err });
        }
        return res.json(data);
    });
};

module.exports.addTodo = (req, res) => {
    const { title } = req.body;
    const userId = req.userId;

    
    db.query(`INSERT INTO todos(user_id, title, completed) VALUES('${userId}', '${title}', false)`, (err, data, fields) => {
        if (err) {
            return res.json({ message: err });
        }
        return res.json({ message: "Todo added successfully" });
    });
};

module.exports.deleteTodo = (req, res) => {
    const todoId = req.params.id;

    
    db.query(`DELETE FROM todos WHERE id = ${todoId}`, (err, data, fields) => {
        if (err) {
            return res.json({ message: err });
        }
        return res.json({ message: "Todo deleted successfully" });
    });
};

module.exports.toggleTodo = (req, res) => {
    const todoId = req.params.id;

    
    db.query(`UPDATE todos SET completed = NOT completed WHERE id = ${todoId}`, (err, data, fields) => {
        if (err) {
            return res.json({ message: err });
        }
        return res.json({ message: "Todo toggled successfully" });
    });
};