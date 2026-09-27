import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        {title && (
          <button
            type="button"
            className="clear-input"
            onClick={() => setTitle("")}
          >
            ×
          </button>
        )}
      </div>

      <textarea
        className="description-input"
        placeholder="Add a short description (optional)"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <div className="form-row">
        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(event) =>
            setDueDate(event.target.value)
          }
        />

        <button type="submit" className="add-button">
          <span>+</span>
          Add task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;