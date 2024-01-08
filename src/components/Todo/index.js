import React from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCircleMinus } from "react-icons/ci";
import "./index.css";

const EachTodo = (props) => {
  const {
    todo: { todoText, _id, completed },
    deleteTodo,
    completedTodo,
  } = props;
  const deleteOneTodo = () => {
    deleteTodo(_id);
  };
  const handleCompleted = () => {
     completedTodo(_id)
  };
  const iconForCompletion = completed ? (
    <IoCheckmarkDoneCircleOutline className="icon" />
  ) : (
    <CiCircleMinus onClick={handleCompleted} className="icon" />
  );
  return (
    <>
      <hr />
      <div className="each-todo-card">
        {iconForCompletion}
        <p className="todo-text">{todoText}</p>
        <RiDeleteBin6Line onClick={deleteOneTodo} className="delete-btn icon" />
      </div>
    </>
  );
};

export default EachTodo;
