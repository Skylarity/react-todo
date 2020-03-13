import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "../../store";
import {SortType} from "../../types";

interface SortState {
	sortOption: SortType;
	sortAscending: boolean;
}

const initialState: SortState = {
	sortOption: SortType.Date,
	sortAscending: true
};

export const slice = createSlice({
	name: "sort",
	initialState,
	reducers: {
		setSortOption: (
			state: SortState,
			sortAction: PayloadAction<SortType>
		) => {
			state.sortOption = sortAction.payload;
		},
		setSortAscending: (
			state: SortState,
			ascendingAction: PayloadAction<boolean>
		) => {
			state.sortAscending = ascendingAction.payload;
		}
	}
});

export const {setSortOption, setSortAscending} = slice.actions;

export const getSortOption = (state: RootState) => state.sort.sortOption;

export const getSortAscending = (state: RootState) => state.sort.sortAscending;

export default slice.reducer;
