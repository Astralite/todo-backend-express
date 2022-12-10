// Import the express and dotenv packages
import express from "express";
import bodyParser from "body-parser";

// Import the Todo model
import { getTodos, createTodo, updateTodo, deleteTodo } from "./models/todo.js";

// Load the environment variables from the .env file

// Create an express app
const app = express();

// add body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the app
app.set("port", process.env.APP_PORT || 3001);
app.set("host", process.env.APP_HOST || "localhost");

// Define the app routes
app.get("/todos", async (req, res) => {
  // Fetch all todos from the database
  const todos = await getTodos();

  // Return the todos as JSON
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  // Create a new todo
  const todo = await createTodo({
    task: req.body.task,
    completed: false,
  });

  // Return the new todo as JSON
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  // Update the todo with the specified ID
  const todo = await updateTodo(
    {
      id: req.params.id,
      task: req.body.task,
      completed: req.body.completed,
    },
  );

  // Return the updated todo as JSON
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  // Delete the todo with the specified ID
  await deleteTodo({ id: req.params.id });

  // Return a success message
  res.send("Todo deleted successfully");
});

// Start the app
app.listen(app.get("port"), app.get("host"), () => {
  console.log(
    `Express server listening on http://${app.get("host")}:${app.get("port")}`
  );
});
