
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import "./styles/App.css"; 

function App() {
  const [todos, setTodos] = useState(() => {

    const raw = localStorage.getItem("todos_v1");
    return raw ? JSON.parse(raw) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="add-todo">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task..."
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo(input);
            }}
          />
          <button onClick={() => addTodo(input)}>Add</button>
        </div>

        <ToDoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleComplete}
          onEdit={editTodo}
        />
      </main>
    </div>
  );
}

export default App;
