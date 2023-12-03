const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todo'
})

db.connect(()=>{
  console.log("db connected")
})


module.exports = db;

