import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "../../store";
import {VisibilityType} from "../../types";

interface VisibilityFilterState {
	filter: VisibilityType;
}

const initialState: VisibilityFilterState = {
	filter: VisibilityType.All
};

export const slice = createSlice({
	name: "visibilityFilter",
	initialState,
	reducers: {
		setFilter: (
			state: VisibilityFilterState,
			filterAction: PayloadAction<VisibilityType>
		) => {
			state.filter = filterAction.payload;
		}
	}
});

export const {setFilter} = slice.actions;

export const getFilter = (state: RootState) => state.visibilityFilter.filter;

export default slice.reducer;
