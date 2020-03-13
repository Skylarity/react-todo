import React from "react";
import {useSelector, useDispatch} from "react-redux";

import "./index.scss";

import {
	getFilteredToDos,
	addToDo,
	removeToDo,
	toggleToDoComplete
} from "./slice";
import {getFilter, setFilter} from "../../components/VisibilityFilter/slice";
import {VisibilityType, SortType} from "../../types";

import {
	getSortOption,
	getSortAscending,
	setSortOption,
	setSortAscending
} from "../../components/Sort/slice";

import {Item} from "../../classes/Item";

import AddToDo from "../../components/AddToDo";
import ToDoItem from "../../components/ToDoItem";
import VisibilityFilter from "../../components/VisibilityFilter";
import Sort from "../../components/Sort";

function ToDoList() {
	const todos: Item[] = useSelector(getFilteredToDos);
	const sortOption: SortType = useSelector(getSortOption);
	const sortAscending: boolean = useSelector(getSortAscending);
	const filter: VisibilityType = useSelector(getFilter);
	const dispatch = useDispatch();

	return (
		<div className="todo-list">
			<h1 className="title">To Do</h1>
			<VisibilityFilter
				filter={filter}
				setFilter={(filter: VisibilityType) =>
					dispatch(setFilter(filter))
				}
			/>
			<Sort
				sortOption={sortOption}
				sortAscending={sortAscending}
				setSortOption={(option: SortType) =>
					dispatch(setSortOption(option))
				}
				toggleAscending={() =>
					dispatch(setSortAscending(!sortAscending))
				}
			/>
			<AddToDo
				addToDo={(todo: Item) =>
					dispatch(addToDo(Item.serialize(todo)))
				}
			/>
			<div className="todos">
				{todos.length === 0 && (
					<div className="done-msg">
						No To Dos &mdash; you're free! &nbsp;
						<span role="img" aria-label="Confetti Cannon">
							🎉
						</span>
					</div>
				)}
				{todos
					.sort((a: Item, b: Item) => {
						// Swap sort direction if not ascending
						const asc = sortAscending ? -1 : 1;
						const desc = sortAscending ? 1 : -1;

						switch (sortOption) {
							case SortType.Date:
								if (a.timestamp === b.timestamp) return 0;
								return a.timestamp > b.timestamp ? asc : desc;
							case SortType.Name:
							default:
								// Handle where upper case is less than lower case
								let aLabel = a.label.toLowerCase();
								let bLabel = b.label.toLowerCase();

								if (aLabel === bLabel) return 0;
								return aLabel < bLabel ? asc : desc;
						}
					})
					.map((todo: Item) => {
						return (
							<ToDoItem
								item={todo}
								toggleComplete={() =>
									dispatch(toggleToDoComplete(todo.id))
								}
								remove={() => dispatch(removeToDo(todo.id))}
								key={`todo-${todo.id}`}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default ToDoList;
