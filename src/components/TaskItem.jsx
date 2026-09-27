import { useState } from "react";

function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const saveEdit = () => {
    if (!editText.trim()) return;

    onEdit(task.id, {
      title: editText.trim(),
    });

    setIsEditing(false);
  };

  const getDateStatus = (date) => {
    if (!date || task.completed) return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${date}T00:00:00`);

    if (due < today) return "overdue";

    if (due.getTime() === today.getTime()) {
      return "today";
    }

    return "";
  };

  const formatDate = (date) => {
    if (!date) return null;

    const taskDate = new Date(`${date}T00:00:00`);

    return taskDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const dateStatus = getDateStatus(task.dueDate);

  return (
    <article
      className={`task-item ${
        task.completed ? "completed" : ""
      }`}
    >
      <button
        className="check-button"
        onClick={() => onToggle(task.id)}
        aria-label="Toggle task"
      >
        {task.completed && "✓"}
      </button>

      <div className="task-content">
        {isEditing ? (
          <div className="edit-wrapper">
            <input
              autoFocus
              value={editText}
              onChange={(event) =>
                setEditText(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  saveEdit();
                }

                if (event.key === "Escape") {
                  setEditText(task.title);
                  setIsEditing(false);
                }
              }}
            />

            <button onClick={saveEdit}>Save</button>

            <button
              onClick={() => {
                setEditText(task.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h3>{task.title}</h3>

            {task.description && (
              <p className="task-description">
                {task.description}
              </p>
            )}

            <div className="task-meta">
              <span className={`priority ${task.priority}`}>
                {task.priority}
              </span>

              {task.dueDate && (
                <span
                  className={`due-date ${dateStatus}`}
                >
                  📅{" "}
                  {dateStatus === "overdue"
                    ? `Overdue · ${formatDate(task.dueDate)}`
                    : dateStatus === "today"
                    ? "Due today"
                    : formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          >
            ✎
          </button>

          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            🗑
          </button>
        </div>
      )}
    </article>
  );
}

export default TaskItem;
