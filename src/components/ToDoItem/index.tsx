import React from "react";
import "./index.scss";
import {Item} from "../../classes/Item";

interface TodoItemProps {
	item: Item;
	toggleComplete: () => void;
	remove: () => void;
}

const ToDoItem = ({item, toggleComplete, remove}: TodoItemProps) => {
	return (
		<div
			className={`todo-list-item pill ${item.completed ? "checked" : ""}`}
		>
			<button className="btn check-btn" onClick={toggleComplete}>
				<i
					className={item.completed ? "gg-check-o" : "gg-radio-check"}
				/>
			</button>
			<span className="label">{item.label}</span>
			<button className="btn close-btn" onClick={remove}>
				<i className="gg-close-o" />
			</button>
		</div>
	);
};

export default ToDoItem;
