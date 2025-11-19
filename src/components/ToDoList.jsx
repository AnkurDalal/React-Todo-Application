import React from "react";
import { ToDoItem } from "./ToDoItem";

export default function ToDoList({ todos, onDelete, onToggle, onEdit }) {
  if (!todos.length) return <p className="empty">No tasks yet.</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
