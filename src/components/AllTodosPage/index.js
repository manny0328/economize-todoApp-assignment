import React, { useEffect, useState } from "react";
import "./index.css";
import Todo from "../Todo";

const AllTodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [userTodo, setTodo] = useState("");
  const [isTab, setTab] = useState("incomplete");
  const [isLoading, setLoading] = useState(false);
  const handleIncomplete = () => setTab("incomplete");
  const handleComplete = () => setTab("complete");
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(userTodo);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoText: userTodo,
        completed: false,
      }),
    };
    try {
      await fetch(
        "https://todos1-m5jo.onrender.com/api/todo/create-todo",
        options
      );
      setTodo("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const deleteTodo = async (todoId) => {
    setLoading(true)
    const options = {
      method: "DELETE",
    };
    try {
      await fetch(
        `https://todos1-m5jo.onrender.com/api/todo/delete-todo/${todoId}`,
        options
      );
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  const completedTodo = async (todoId) => {
    setLoading(true)
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    };
    try {
      await fetch(
        `https://todos1-m5jo.onrender.com/api/todo/update-todo/${todoId}`,
        options
      );
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  const fetchTodos = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://todos1-m5jo.onrender.com/api/todo/all-todos"
      );
      const data = await response.json();
      const allTodos = data.message;
      console.log(allTodos);
      setTodos(allTodos);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const returnFilterdTodos = () => {
    const isTrue = isTab === "incomplete" ? false : true;
    const filteredTodos = todos.filter((todo) => {
      return todo.completed === isTrue;
    });
    return filteredTodos;
  };
  return (
    <>
      <section className="main-page">
        <div className="child-div">
          <div className="top-data">
            <div className="day-card">
              <h2 className="day-text">Saturday, June 1</h2>
              <p className="no-active-tasks">3 Active Tasks</p>
            </div>
            <div className="type-of-tasks">
              <button
                className={`task-category ${
                  isTab !== "incomplete" && "specific-category"
                }`}
                onClick={handleIncomplete}
              >
                Incomplete Tasks
              </button>
              <button
                className={`task-category ${
                  isTab !== "complete" && "specific-category"
                }`}
                onClick={handleComplete}
              >
                Completed Tasks
              </button>
            </div>
          </div>
          <form className="form-card" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a task..."
              className="input-ele"
              value={userTodo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </form>
          <div className="todos-container">
            {todos.length > 0 ? (
              returnFilterdTodos().length > 0 ? (
                returnFilterdTodos().map((todo) => (
                  <Todo
                    completedTodo={completedTodo}
                    deleteTodo={deleteTodo}
                    key={todo._id}
                    todo={todo}
                  />
                ))
              ) : (
                <p className="empty-tasks">No {isTab} tasks!</p>
              )
            ) : (
              <p className="empty-tasks">No {isTab} tasks!</p>
            )}
            <hr />
          </div>
        </div>
      </section>
      {isLoading && <div className="loading-card">
        <h1 className="loading">Loading...</h1>
      </div>}
    </>
  );
};

export default AllTodosPage;
