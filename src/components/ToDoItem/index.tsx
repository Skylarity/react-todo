import React from "react";
import "./index.scss";
import {Item} from "../../classes/Item";

interface TodoItemProps {
	todo: Item;
	toggleComplete: () => void;
	remove: () => void;
}

const ToDoItem = ({todo, toggleComplete, remove}: TodoItemProps) => {
	return (
		<div
			id={`toDo${todo.id}`}
			title={`To Do ${todo.id}`}
			className={`todo-list-item pill ${todo.completed ? "checked" : ""}`}
		>
			<label
				id="toggleToDoLabel"
				className="sr-only"
				htmlFor={`Toggle ToDo ${todo.id} Complete`}
			>{`Toggle To Do ${todo.id} Complete`}</label>
			<button
				className="btn check-btn"
				name={`Toggle ToDo ${todo.id} Complete`}
				aria-labelledby="toggleToDoLabel"
				onClick={toggleComplete}
			>
				<i
					className={todo.completed ? "gg-check-o" : "gg-radio-check"}
				/>
			</button>
			<span className="label">{todo.label}</span>
			<button className="btn close-btn" onClick={remove}>
				<i className="gg-close-o" />
			</button>
		</div>
	);
};

export default ToDoItem;
