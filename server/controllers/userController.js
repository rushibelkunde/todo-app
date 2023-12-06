const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require("../configs/db")


module.exports.getUsers = (req, res) => {
  db.connect()
  db.query("select * from users", (err, data) => {
    if (err) return res.json(err)
    console.log(req.userId)
    return res.json(data)
  })
}

module.exports.register = async (req, res) => {
  db.connect()
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(`INSERT INTO users(username, pass) VALUES('${username}', '${hashedPassword}')`, (err, data, fields) => {
    if (err) {
      return res.json({ message: err })
    }
    return res.json({ message: "user registered" })
  })


}

module.exports.login = async (req, res) => {
  db.connect()
  const { username, password } = req.body;
  db.query(`select * from users WHERE username = '${username}'`, async (err, data, fields) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: err });
    }
    if (!data || !(await bcrypt.compare(password, data[0].pass))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: data[0].uid }, process.env.SECRET, { expiresIn: '1h' });
    res.json({ token });
  })

}