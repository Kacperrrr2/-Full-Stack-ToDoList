import express from "express";
import { createTodo, getAllTodos,deleteTodoById } from "../controller/todo.controller.js";
const router= express.Router();

router.post("/createTodo", createTodo);
router.get("/getAllTodos", getAllTodos);
router.delete("/deleteTodo/:id",deleteTodoById);
export default router;
