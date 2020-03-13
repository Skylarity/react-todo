import React from "react";
import {render} from "@testing-library/react";
import ToDoItem from ".";
import {Item} from "../../classes/Item";

test("renders To Do correctly", () => {
	const todo: Item = new Item("Test To Do");

	const {getByText} = render(
		<ToDoItem todo={todo} toggleComplete={() => {}} remove={() => {}} />
	);

	expect(getByText(todo.label)).toBeInTheDocument();
});
