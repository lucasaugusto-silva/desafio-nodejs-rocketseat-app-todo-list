const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }
  request.user = user;
  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const users2 = {
    id: uuidv4(),
    name: name,
    username: username,
    todos: [],
  };

  users.push(users2);
  return response.json(users2);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  return response.json(username);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { username } = request.headers;

  const { user } = request;
  if (username === user.username) {
    const todoList = {
      id: uuidv4(),
      title: title,
      done: new Date(deadline),
      created_at: new Date(),
    };
    user.todos.push(todoList);
  }
  return response.status(200).json(user.todos);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
