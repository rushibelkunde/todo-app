const pool = require('../configs/db');

module.exports.getCategories = async (req, res) => {
    try {
        const query = {
            text: 'SELECT * FROM categories ORDER BY id DESC',
        };

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.addCategory = async (req, res) => {
    try {
        const { categoryName, displayName } = req.body;

        const query = {
            text: 'INSERT INTO categories(category_name, display_name) VALUES($1, $2)',
            values: [categoryName, displayName],
        };

        await pool.query(query);
        res.json({ message: "Category added successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const query = {
            text: 'DELETE FROM categories WHERE id = $1',
            values: [categoryId],
        };

        await pool.query(query);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};
