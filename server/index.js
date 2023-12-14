// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.use(cors({credentials: true, origin: "https://todo-app-rt5p.vercel.app"}));
// app.use(cors({credentials: true, origin: "http://localhost:3000"}));
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.urlencoded())

app.use('/', require("./routes"))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;