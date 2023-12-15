const pool = require('../configs/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users(username, pass) VALUES($1, $2)',
      values: [username, hashedPassword],
    };

    await pool.query(query);
    res.json({ message: 'user registered' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await pool.query(query);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.pass))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.uid }, process.env.SECRET, { expiresIn: '23h' });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
