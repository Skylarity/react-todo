import React from "react";

import "./index.scss";

import {Item} from "../../classes/Item";
import {KeyCodes} from "../../types";

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

	constructor(props: AddToDoProps) {
		super(props);

		this.state = {
			todoName: "",
			placeholderIndex: 0
		};
	}

	componentDidMount() {
		this.refreshPlaceholder();
	}

	addToDo = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === KeyCodes.Enter) {
			e.preventDefault();

			this.props.addToDo(new Item(this.state.todoName));

			this.setState({
				todoName: ""
			});

			this.refreshPlaceholder();
		}
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
			<input
				className="add-todo pill"
				type="text"
				name="add-todo"
				id="addTodo"
				placeholder={`Add To Do (e.g. "${
					this.placeholders[this.state.placeholderIndex]
				}")`}
				value={this.state.todoName}
				onChange={this.handleTodoNameChange}
				onKeyDown={this.addToDo}
			/>
		);
	}
}

export default AddToDo;
