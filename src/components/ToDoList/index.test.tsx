import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import toDoListReducer from "./slice";
import sortReducer from "../../components/Sort/slice";
import visibilityFilterReducer from "../../components/VisibilityFilter/slice";
import ToDoList from ".";
import {Item} from "../../classes/Item";

// ********** SETUP **********//
// UUID expression taken from:https://www.regextester.com/99148
const toDoIdExp = /To Do [0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/i;

// ADAPTED FROM: https://testing-library.com/docs/example-react-redux
function renderWithRedux(ui: JSX.Element) {
	const store = configureStore({
		reducer: {
			toDoList: toDoListReducer,
			sort: sortReducer,
			visibilityFilter: visibilityFilterReducer
		}
	});

	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store
	};
}

// ********** TESTS **********//
// ***** GENERAL *****//
test("renders filters", () => {
	const {getAllByText} = renderWithRedux(<ToDoList />);

	getAllByText(/All|Complete|Incomplete/i).forEach((el: HTMLElement) => {
		expect(el).toBeInTheDocument();
	});
});

test("renders sort options", () => {
	const {getAllByText} = renderWithRedux(<ToDoList />);

	getAllByText(/Newer|Older|Name \(A-Z\)|Name \(Z-A\)/i).forEach(
		(el: HTMLElement) => {
			expect(el).toBeInTheDocument();
		}
	);
});

test("renders to do input", () => {
	const {getByLabelText} = renderWithRedux(<ToDoList />);

	expect(getByLabelText(/Add a To Do/i)).toBeInTheDocument();
});

test("renders to do list", () => {
	const {getByText, store} = renderWithRedux(<ToDoList />);

	store.getState().toDoList.toDos.forEach((todo: Item) => {
		expect(getByText(todo.label)).toBeInTheDocument();
	});
});

// ***** TO DOS *****//
test("toggles To Do complete status", () => {
	const {getAllByTitle, getAllByLabelText} = renderWithRedux(<ToDoList />);

	const toggleButton = getAllByLabelText(/Toggle To Do.*Complete/i)[0];
	fireEvent.click(toggleButton);
	expect(getAllByTitle(/To Do/i)[0].classList.value).toContain("checked");
});

// ***** ADDING TO DOS *****//
test("adds a todo when the form is submitted", () => {
	const {getByLabelText, getAllByTitle} = renderWithRedux(<ToDoList />);

	const toDoName = "Test To Do addition";
	const numToDos = getAllByTitle(/To Do/i).length;

	const addInput = getByLabelText(/To Do Name Input/i);
	fireEvent.change(addInput, {target: {value: toDoName}});
	fireEvent.submit(addInput);

	expect(getAllByTitle(/To Do/i).length).toEqual(numToDos + 1);
});

test('adds a todo when "Add" is clicked', () => {
	const {getByLabelText, getAllByTitle} = renderWithRedux(<ToDoList />);

	const toDoName = "Test To Do addition";
	const numToDos = getAllByTitle(/To Do/i).length;

	const addInput = getByLabelText(/To Do Name Input/i);
	fireEvent.change(addInput, {target: {value: toDoName}});

	const addButton = getByLabelText(/Add a To Do/i);
	fireEvent.click(addButton);

	expect(getAllByTitle(/To Do/i).length).toEqual(numToDos + 1);
});

// ***** VISIBILITY *****//
test("can view all To Dos", () => {
	const {queryByText, getByLabelText, store} = renderWithRedux(<ToDoList />);

	const completeFilter = getByLabelText(/Filter by All/i);
	fireEvent.click(completeFilter);

	store.getState().toDoList.toDos.forEach((todo: Item) => {
		expect(queryByText(todo.label)).toBeTruthy(); // all are visible
	});
});

test("can view all complete To Dos", () => {
	const {queryByText, getByLabelText, store} = renderWithRedux(<ToDoList />);

	const completeFilter = getByLabelText(/Filter by Complete/i);
	fireEvent.click(completeFilter);

	store
		.getState()
		.toDoList.toDos.filter((todo: Item) => !todo.completed) // incomplete To Dos
		.forEach((todo: Item) => {
			expect(queryByText(todo.label)).not.toBeTruthy(); // are not visible
		});
});

test("can view all incomplete To Dos", () => {
	const {queryByText, getByLabelText, store} = renderWithRedux(<ToDoList />);

	const completeFilter = getByLabelText(/Filter by Incomplete/i);
	fireEvent.click(completeFilter);

	store
		.getState()
		.toDoList.toDos.filter((todo: Item) => todo.completed) // completed To Dos
		.forEach((todo: Item) => {
			expect(queryByText(todo.label)).not.toBeTruthy(); // are not visible
		});
});

// ***** SORTING *****//
test("changes render order when sort method is changed - date", () => {
	const {getAllByTitle, getByLabelText} = renderWithRedux(<ToDoList />);

	const dateSort = getByLabelText(/Sort by Date/i); // date is selected by default

	const renderedToDos = getAllByTitle(toDoIdExp);
	fireEvent.click(dateSort); // once to reverse this option
	const newRenderedToDos = getAllByTitle(toDoIdExp);

	renderedToDos.forEach((todo: HTMLElement, i: number) => {
		expect(todo.id).not.toEqual(newRenderedToDos[i].id);
	});
});

test("changes render order when sort method is changed - name", () => {
	const {getAllByTitle, getByLabelText} = renderWithRedux(<ToDoList />);

	const dateSort = getByLabelText(/Sort by Name/i);
	fireEvent.click(dateSort); // once to select this option

	const renderedToDos = getAllByTitle(toDoIdExp);
	fireEvent.click(dateSort); // once to reverse the option
	const newRenderedToDos = getAllByTitle(toDoIdExp);

	renderedToDos.forEach((todo: HTMLElement, i: number) => {
		expect(todo.id).not.toEqual(newRenderedToDos[i].id);
	});
});
