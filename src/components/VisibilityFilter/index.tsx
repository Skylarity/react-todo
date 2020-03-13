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

const VisibilityFilter = ({filter, setFilter}: VisibilityFilterProps) => {
	return (
		<div className="visibility-filters">
			{filterDisplayOptions.map(
				(filterDisplayOption: FilterDisplayOption, i: number) => {
					return (
						<button
							className={`visibility-filter reset-btn-style ${filter ===
								filterDisplayOption.type && "active"}`}
							onClick={() => setFilter(filterDisplayOption.type)}
							key={`fdo-${i}`}
						>
							<div className="filter-label">
								{filterDisplayOption.label}
							</div>
						</button>
					);
				}
			)}
		</div>
	);
};

export default VisibilityFilter;
