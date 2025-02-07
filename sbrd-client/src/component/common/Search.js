import React from "react";

const Search = ({ search, setSearch, placeholder = "Search items..." }) => {
	return (
		<div className="col-sm-6 mb-4">
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					className="form-control"
					type="search"
					role="searchbox"
					placeholder={placeholder}
					value={search}
					onChange={(e) =>
						setSearch(e.target.value)
					}></input>
			</form>
		</div>
	);
};

export default Search;
