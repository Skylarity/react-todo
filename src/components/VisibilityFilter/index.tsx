import React from "react";

import "./index.scss";

import {VisibilityType} from "../../types";

interface VisibilityFilterProps {
	filter: VisibilityType;
	setFilter: (filter: VisibilityType) => void;
}

interface FilterDisplayOption {
	label: string;
	type: VisibilityType;
}

/**
 * Array of options to loop through -- dynamically creating the filter UI
 */
const filterDisplayOptions: FilterDisplayOption[] = [
	{
		label: "All",
		type: VisibilityType.All
	},
	{
		label: "Complete",
		type: VisibilityType.Complete
	},
	{
		label: "Incomplete",
		type: VisibilityType.Incomplete
	}
];

// Function Component -- ToDoList handles state
const VisibilityFilter = ({filter, setFilter}: VisibilityFilterProps) => {
	return (
		<div className="visibility-filters">
			{filterDisplayOptions.map(
				(filterDisplayOption: FilterDisplayOption, i: number) => {
					return [
						<label
							id={`visibilityFilter${filterDisplayOption.label}`}
							className="sr-only"
							key={`fdo-label-${i}`}
							htmlFor={`visibility-filter-${filterDisplayOption.label.toLowerCase()}`}
						>
							Filter by {filterDisplayOption.label}
						</label>,
						<button
							name={`visibility-filter-${filterDisplayOption.label.toLowerCase()}`}
							aria-labelledby={`visibilityFilter${filterDisplayOption.label}`}
							className={`visibility-filter reset-btn-style ${filter ===
								filterDisplayOption.type && "active"}`}
							onClick={() => setFilter(filterDisplayOption.type)}
							key={`fdo-${i}`}
						>
							<div className="filter-label">
								{filterDisplayOption.label}
							</div>
						</button>
					];
				}
			)}
		</div>
	);
};

export default VisibilityFilter;
