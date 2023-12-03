Certainly! To add screenshots to your README.md, you can create a new section and use the Markdown image syntax. Here's an example:

```markdown
# Todo App

A simple Todo App built with React.js for the frontend, Express.js for the backend, and MySQL for the database. User authentication is implemented using JSON Web Tokens (JWT).

## Features

- User registration and login
- CRUD operations for Todos (Create, Read, Update, Delete)
- Token-based authentication for secure access

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/rushibelkunde/todo-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your MySQL database and update the configuration in `server/config/db.js`.

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the Todo App.

## Screenshots

![Screenshot 1](/screenshots/ui.png)
![Screenshot 2](/screenshots/register.png)

## API Endpoints

- `POST /register`: Register a new user.
- `POST /login`: Authenticate and log in a user.
- `GET /todos`: Get all Todos for the authenticated user.
- `POST /addTodo`: Add a new Todo for the authenticated user.
- `PUT /toggleTodo/:id`: Toggle the completion status of a Todo.
- `DELETE /deleteTodo/:id`: Delete a Todo.

## Technologies Used

- React.js
- Express.js
- MySQL
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## Author

[Rushikesh Belkunde]

## License

This project is licensed under the [MIT License](LICENSE).
```
