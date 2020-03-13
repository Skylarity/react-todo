import React from "react";

import "./index.scss";

import {SortType} from "../../types";

interface SortProps {
	sortOption: SortType;
	sortAscending: boolean;
	setSortOption: (sort: SortType) => void;
	toggleAscending: () => void;
}

interface SortDisplayOption {
	label: {asc: string; desc: string};
	type: SortType;
}

const sortDisplayOptions: SortDisplayOption[] = [
	{
		label: {
			asc: "Newer",
			desc: "Older"
		},
		type: SortType.Date
	},
	{
		label: {
			asc: "Name (A-Z)",
			desc: "Name (Z-A)"
		},
		type: SortType.Name
	}
];

const Sort = ({
	sortOption,
	sortAscending,
	setSortOption,
	toggleAscending
}: SortProps) => {
	return (
		<div className="sort-list">
			{sortDisplayOptions.map(
				(sortDisplayOption: SortDisplayOption, i: number) => {
					return (
						<button
							className={`sort-option reset-btn-style ${sortOption ===
								sortDisplayOption.type && "active"}`}
							onClick={() =>
								sortOption !== sortDisplayOption.type
									? setSortOption(sortDisplayOption.type)
									: toggleAscending()
							}
							key={`sdo-${i}`}
						>
							<div className="sort-option-label">
								{sortAscending
									? sortDisplayOption.label.asc
									: sortDisplayOption.label.desc}
							</div>
							<i
								className={
									sortAscending ? "gg-sort-az" : "gg-sort-za"
								}
							></i>
						</button>
					);
				}
			)}
		</div>
	);
};

export default Sort;
