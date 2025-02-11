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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
