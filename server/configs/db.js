const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

// Execute table creation queries
async function createTables() {
  try {
    const client = await pool.connect();
    await client.query(createUserTableQuery);
    await client.query(createTodosTableQuery);
    console.log('Tables created successfully');
    client.release();
  } catch (err) {
    console.error('Error creating tables:', err);
  } 
}

// Call the function to create tables
createTables();

module.exports = pool




