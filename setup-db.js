import Sequelize from 'sequelize';

// Warning: If the reset flag is true any data in the todos table will be deleted
const RESET = (process.argv[2] === 'reset') // accept reset flag

// Instantiate an instance of Sequelize
// Open the SQLite database file
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'todos.db'
});

// Check the connection status
try {
  await sequelize.authenticate();
  console.log('Connection to the SQLite database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the SQLite database:', err);
}

// Define the todos model
const Todos = await sequelize.define('todos', {
  task: Sequelize.STRING,
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  }
});

// Delete the todos table
if (RESET) await sequelize.query('DROP TABLE IF EXISTS todos');

// Sync the model with the database
await Todos.sync();

// Create a todo
await Todos.create({
  task: 'Test Todo 123',
  completed: false
});

// Query todos
await Todos.findAll().then(todos => {
  console.log(todos.length + ' todos found');
});