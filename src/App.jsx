import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import "./App.css";

const STORAGE_KEY = "taskflow_tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Could not load tasks:", error);
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((currentTasks) => [
      {
        id: crypto.randomUUID(),
        ...task,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...currentTasks,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const editTask = (id, updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="app">
      <main className="container">
        <Header
          totalTasks={tasks.length}
          activeCount={activeCount}
          completedCount={completedCount}
          progress={progress}
        />

        <TaskForm onAddTask={addTask} />

        <TaskFilters
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
    </div>
  );
}

export default App;