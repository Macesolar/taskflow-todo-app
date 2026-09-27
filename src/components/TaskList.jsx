import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>

        <h2>No tasks here</h2>

        <p>
          Add a task above and start getting things done.
        </p>
      </div>
    );
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}

export default TaskList;