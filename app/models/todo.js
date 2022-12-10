// Import the sqlite3 package
import sqlite3 from "sqlite3";

// Open the SQLite database file
const db = new sqlite3.Database("todos.db");

// Get all todos
export const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM todos", (err, rows) => {
      if (err) return reject(err);

      resolve(rows);
    });
  });
};

// Define the CRUD operations
export const createTodo = ({ task }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO todos (task) VALUES (?)",
      [task],
      function (err) {
        if (err) return reject(err);

        // return the newly created todo
        resolve({
          id: this.lastID,
          task,
          completed: false,
        });
      }
    );
  });
};

// Update a todo
export const updateTodo = ({ id, task, completed }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE todos SET task = ?, completed = ? WHERE id = ?",
      [task, completed, id],
      function (err) {
        if (err) return reject(err);

        resolve(this.changes);
      }
    );
  });
};

// Delete a todo
export const deleteTodo = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
      if (err) return reject(err);

      resolve(this.changes);
    });
  });
};
