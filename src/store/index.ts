import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import toDoListReducer from "../components/ToDoList/slice";
import sortReducer from "../components/Sort/slice";
import visibilityFilterReducer from "../components/VisibilityFilter/slice";

export const store = configureStore({
	reducer: {
		toDoList: toDoListReducer,
		sort: sortReducer,
		visibilityFilter: visibilityFilterReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
