
import React, { useState } from "react";

export function ToDoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const saveEdit = () => {
    const text = draft.trim();
    if (text) {
      onEdit(todo.id, text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") {
                setDraft(todo.text);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <span className="text" onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button
              onClick={() => {
                setIsEditing(false);
                setDraft(todo.text);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
