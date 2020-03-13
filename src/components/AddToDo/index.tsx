import React, {createRef, RefObject} from "react";

import "./index.scss";

import {Item} from "../../classes/Item";

interface AddToDoProps {
	addToDo: (item: Item) => void;
}

interface AddToDoState {
	todoName: string;
	placeholderIndex: number;
}

// Class Component -- we need local state here to keep track of the name of our new To Do
class AddToDo extends React.Component<AddToDoProps, AddToDoState> {
	placeholders: string[] = [
		"Clear my mind",
		"Take a deep breath",
		"Do some stretches",
		"Give myself a break"
	];

	addToDoEl: RefObject<HTMLInputElement>;

	constructor(props: AddToDoProps) {
		super(props);

		this.state = {
			todoName: "",
			placeholderIndex: 0
		};

		this.addToDoEl = createRef(); // So we can call .focus() after making our new To Do
	}

	componentDidMount() {
		this.refreshPlaceholder();
	}

	/**
	 * Adds our To Do to the store
	 */
	addToDo = (e: React.FormEvent) => {
		e.preventDefault();

		this.props.addToDo(new Item(this.state.todoName));

		this.setState({
			todoName: ""
		});

		this.refreshPlaceholder();
		this.addToDoEl.current?.focus();
	};

	/**
	 * Sets our To Do name in state
	 */
	handleTodoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			todoName: e.target.value
		});
	};

	/**
	 * Randomly chooses placeholder text
	 */
	refreshPlaceholder = () => {
		this.setState({
			placeholderIndex: Math.floor(
				Math.random() * this.placeholders.length
			)
		});
	};

	render() {
		return (
			<form className="add-todo-container" onSubmit={this.addToDo}>
				<label id="addToDoLabel" htmlFor="add-todo" className="sr-only">
					To Do Name Input
				</label>
				<input
					ref={this.addToDoEl}
					className="add-todo pill"
					type="text"
					id="addToDo"
					name="add-todo"
					aria-labelledby="addToDoLabel"
					placeholder={`Add To Do (e.g. ${
						this.placeholders[this.state.placeholderIndex]
					})`}
					value={this.state.todoName}
					onChange={this.handleTodoNameChange}
					autoFocus
				/>
				<label
					id="addToDoButtonLabel"
					htmlFor="add-todo-btn"
					className="sr-only"
				>
					Add a To Do
				</label>
				<button
					name="add-todo-btn"
					aria-labelledby="addToDoButtonLabel"
					className={`reset-btn-style add-btn ${this.state.todoName
						.length > 0 && "active"}`}
					type="submit"
				>
					Add
				</button>
			</form>
		);
	}
}

export default AddToDo;
