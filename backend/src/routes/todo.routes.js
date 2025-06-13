import express from "express";
import { createTodo, getAllTodos,deleteTodoById, updateTodoById } from "../controller/todo.controller.js";
const router= express.Router();

router.post("/createTodo", createTodo);
router.get("/getAllTodos", getAllTodos);
router.post("/updateTodo/:id",updateTodoById);
router.delete("/deleteTodo/:id",deleteTodoById);
export default router;
