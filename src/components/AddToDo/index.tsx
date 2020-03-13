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

class AddToDo extends React.Component<AddToDoProps, AddToDoState> {
	placeholders: string[] = [
		"Clean the backyard",
		"Take out the trash",
		"Give the dog some belly rubs"
	];

	addToDoEl: RefObject<HTMLInputElement>;

	constructor(props: AddToDoProps) {
		super(props);

		this.state = {
			todoName: "",
			placeholderIndex: 0
		};

		this.addToDoEl = createRef();
	}

	componentDidMount() {
		this.refreshPlaceholder();
	}

	addToDo = (e: React.FormEvent) => {
		e.preventDefault();

		this.props.addToDo(new Item(this.state.todoName));

		this.setState({
			todoName: ""
		});

		this.refreshPlaceholder();
		this.addToDoEl.current?.focus();
	};

	handleTodoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			todoName: e.target.value
		});
	};

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
					Add a To Do
				</label>
				<input
					ref={this.addToDoEl}
					className="add-todo pill"
					type="text"
					id="addToDo"
					name="add-todo"
					aria-labelledby="addToDoLabel"
					placeholder={`Add To Do (e.g. "${
						this.placeholders[this.state.placeholderIndex]
					}")`}
					value={this.state.todoName}
					onChange={this.handleTodoNameChange}
					autoFocus
				/>
				<button
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
