import React from "react";
import {Link} from "react-router-dom";
import Book from "../book";

export default function SearchPage(props) {
	// Destructing
	const {
		handleSearchResult,
		handleShelfing,
		handleBack,
		query,
		searchResult,
	} = props;

	// Invoking the live-Search function
	const invokeLiveSearch = (e) => {
		handleSearchResult(e.target.value);
	};

	// Invoking the tiny Back-Home Button function
	const back = () => {
		handleBack();
	};

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link className='close-search' to='/' onClick={back}>
					Close
				</Link>
				<div className='search-books-input-wrapper'>
					<input
						type='text'
						placeholder='Search by title or author'
						onChange={(e) => invokeLiveSearch(e)}
					/>
				</div>
			</div>
			<div className='search-books-results'>
				<ol className='books-grid'>
					{searchResult.length > 0
						? searchResult.map((book) => (
								<Book
									key={book.id}
									currentBook={book}
									handleShelfing={handleShelfing}
								/>
						  ))
						: query.length > 0
						? "Sorry, no books founded!"
						: "Search our library"}
				</ol>
			</div>
		</div>
	);
}
