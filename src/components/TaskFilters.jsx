function TaskFilters({
  filter,
  setFilter,
  search,
  setSearch,
  activeCount,
  completedCount,
  onClearCompleted,
}) {
  return (
    <section className="toolbar">
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
          <span>{activeCount}</span>
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
          <span>{completedCount}</span>
        </button>
      </div>

      <div className="toolbar-right">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {completedCount > 0 && (
          <button
            className="clear-completed"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </section>
  );
}

export default TaskFilters;