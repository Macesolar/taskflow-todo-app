function Header({
  totalTasks,
  activeCount,
  completedCount,
  progress,
}) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">MY TASKS</p>

        <h1>
          Get things <span>done.</span>
        </h1>

        <p className="subtitle">
          Organize your day, one task at a time.
        </p>
      </div>

      <div className="progress-card">
        <div className="progress-top">
          <span>Today's progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="stats">
          <span>{totalTasks} total</span>
          <span>{activeCount} active</span>
          <span>{completedCount} done</span>
        </div>
      </div>
    </header>
  );
}

export default Header;