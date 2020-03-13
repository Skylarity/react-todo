import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {RootState} from "../../store";
import {VisibilityType} from "../../types";
import {Item} from "../../classes/Item";

export interface ToDoListState {
	toDos: Item[];
}

export const initialState: ToDoListState = {
	toDos: [
		Item.serialize(
			new Item("Have a great day", true, new Date("2019-10-18"))
		),
		Item.serialize(new Item("Achieve your dreams"))
	]
};

export const slice = createSlice({
	name: "toDoList",
	initialState,
	reducers: {
		addToDo: (state: ToDoListState, toDoAction: PayloadAction<Item>) => {
			// Add the To Do
			if (toDoAction.payload.label.length > 0) {
				state.toDos.push(toDoAction.payload);
			}
		},
		removeToDo: (state: ToDoListState, idAction: PayloadAction<string>) => {
			// Get the index of the To Do
			const removeIndex: number = state.toDos.findIndex(
				(todo: Item) => todo.id === idAction.payload
			);

			// Remove the To Do
			if (removeIndex >= 0) {
				state.toDos.splice(removeIndex, 1);
			}
		},
		toggleToDoComplete: (
			state: ToDoListState,
			idAction: PayloadAction<string>
		) => {
			// Get the index of the To Do
			const toDoIndex: number = state.toDos.findIndex(
				(todo: Item) => todo.id === idAction.payload
			);

			// toggle the completed state of the To Do
			if (toDoIndex >= 0) {
				const todo = Item.fromJSON(state.toDos[toDoIndex]);
				todo.toggle();
				state.toDos[toDoIndex] = Item.serialize(todo);
			}
		}
	}
});

export const {addToDo, removeToDo, toggleToDoComplete} = slice.actions;

export const getAllToDos = (state: RootState) => state.toDoList.toDos;

const getVisibilityFilter = (state: RootState) => state.visibilityFilter.filter;
const getToDos = (state: RootState) => state.toDoList.toDos;

export const getFilteredToDos = createSelector(
	[getVisibilityFilter, getToDos],
	(visibilityFilter: VisibilityType, todos: Item[]) =>
		todos.filter((todo: Item) => {
			switch (visibilityFilter) {
				case VisibilityType.Complete:
					return todo.completed;
				case VisibilityType.Incomplete:
					return !todo.completed;
				case VisibilityType.All:
				default:
					return true;
			}
		})
);

export default slice.reducer;
