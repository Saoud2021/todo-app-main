import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [filter, setFilter] = useState("all");
  const [draggedItem, setDraggedItem] = useState(null);

  const inputRef = useRef();
  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedTodos) {
      try {
        setTodoList(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error loading todos from localStorage:", error);
      }
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save todos to localStorage whenever todoList changes
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todoList));
}, [todoList]);

// Save dark mode preference
useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  const toggleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isComplete: !t.isComplete } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodoList((prev) => prev.filter((t) => !t.isComplete));
  };

  // Filter todos based on current filter
  const getFilteredTodos = () => {
    switch (filter) {
      case "active":
        return todoList.filter((t) => !t.isComplete);
      case "completed":
        return todoList.filter((t) => t.isComplete);
      default:
        return todoList;
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, todo) => {
    setDraggedItem(todo);
    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetTodo) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetTodo.id) {
      return;
    }

    const draggedIndex = todoList.findIndex((t) => t.id === draggedItem.id);
    const targetIndex = todoList.findIndex((t) => t.id === targetTodo.id);

    const newTodoList = [...todoList];
    newTodoList.splice(draggedIndex, 1);
    newTodoList.splice(targetIndex, 0, draggedItem);

    setTodoList(newTodoList);
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todoList.filter((t) => !t.isComplete).length;

  return (
    <>
      <div className={`app-root  ${darkMode ? "dark" : "light"}`}>
        {darkMode ? (
          <img
            src="../images/bg-desktop-dark.jpg"
            className="background-image"
          />
        ) : (
          <img
            src="../images/bg-desktop-light.jpg"
            className="background-image"
          />
        )}

        <div className="container">
          <div className="todo-header">
            <h1>TODO</h1>{" "}
            <div
              className="theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              role="button"
              tabIndex={0}
            >
              <img
                src={
                  darkMode
                    ? "../images/icon-sun.svg"
                    : "../images/icon-moon.svg"
                }
                alt="Toggle theme"
              />
            </div>
          </div>
          <div className=" input-card">
            <div className="check-button" onClick={add}>
              <img
                className="check-icon"
                src="../images/icon-check.svg"
                alt=""
              />
            </div>{" "}
            <input
              type="text"
              ref={inputRef}
              placeholder="Create a new todo..."
              onKeyDown={(e) => e.key === "Enter" && add()}
            />
          </div>
          <div className="sub-container">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                {filter === "all"
                  ? "No todos yet. Add one above!"
                  : filter === "active"
                  ? "No active todos!"
                  : "No completed todos!"}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, todo)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, todo)}
                >
                  <div
                    className={`check-button ${
                      todo.isComplete ? "active" : ""
                    }`}
                    onClick={() => toggleComplete(todo.id)}
                  >
                    <img
                      className="check-icon"
                      src="../images/icon-check.svg"
                      alt=""
                    />
                  </div>
                  <p className={todo.isComplete ? "completed" : ""}>
                    {todo.text}
                  </p>
                  <button
                    className="delete-button"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete todo"
                  >
                    <span className="delete-icon">✕</span>
                  </button>
                </div>
              ))
            )}

            {/* Footer with item count and clear button */}
            {todoList.length > 0 && (
              <div className="items-footer">
                <span>{activeCount} items left</span>
                <button className="clear-button" onClick={clearCompleted}>
                  Clear Completed
                </button>
              </div>
            )}
          </div>
          {/* Status filter buttons */}
          <div className="status-card">
            <button
              className={`status-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`status-button ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`status-button ${
                filter === "completed" ? "active" : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <p className="drag-instruction">Drag and drop to reorder list</p>
        </div>
      </div>
    </>
  );
}

export default App;
