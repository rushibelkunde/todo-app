const { Pool } = require('pg');


const pool = new Pool({
  connectionString:  process.env.DB_URL_VERSION2, 
  ssl: {
    require: true,
  },
});



const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    pass VARCHAR(255)
  );
`;

const createTodosTableQuery = `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

const createcategoriesTableQuery = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL
);
`

const createSubTodosQuery = `
CREATE TABLE IF NOT EXISTS subTodos (
  id SERIAL PRIMARY KEY,
  user_id INT,
  todo_id INT,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE ON UPDATE CASCADE
);
`;

const DropTablesQuery = `
DROP TABLE IF EXISTS subTodos;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS catagories;
`

// Execute table creation queries
async function createTables() {
  try {
    const client = await pool.connect();
    await client.query(createUserTableQuery);
    await client.query(createcategoriesTableQuery);
    await client.query(createTodosTableQuery);
    await client.query(createSubTodosQuery);
    // await client.query(DropTablesQuery)
    console.log('Tables created successfully');
    client.release();
  } catch (err) {
    console.error('Error creating tables:', err);
  } 
}

// Call the function to create tables
createTables();

module.exports = pool




