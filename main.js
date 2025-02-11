import express from "express";
import mongoose from "mongoose";
import Task from "./task.js";
import { DATABASE_URL, PORT } from "./env.js";

const app = express();
app.use(express.json());

await mongoose.connect(DATABASE_URL);

app.post("/tasks", async (req, res) => {
  const data = req.body;
  const newTask = await Task.create(data);
  res.status(201).send(newTask);
});

app.get("/tasks", async (req, res) => {
  // sort, count
  const count = Number(req.query.count) || 0;
  const sortOption =
    req.query.sort === "oldest" ? ["createdAt", "asc"] : ["createdAt", "desc"];
  const tasks = await Task.find().limit(count).sort([sortOption]);
  res.send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: "Cannot find given id" });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
