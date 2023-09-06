import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import {Route, Switch} from "react-router-dom";
import SearchPage from "./Components/Routs/search-page.js";
import HomePage from "./Components/Routs/home-page.js";

class App extends React.Component {
	state = {
		loading: true,
		books: [],
		query: "",
		searchResult: [],
	};

	async componentDidMount() {
		try {
			const books = await BooksAPI.getAll();
			this.setState({books, loading: null});
		} catch (error) {
			console.log(error);
		}
	}

	/**Methohds */

	/**Home-Page Methods */

	// Home-Page Shelfing
	handleHomeShelfing = (event, changedBook) => {
		// Seeting the new shelf locally
		changedBook.shelf = event.target.value;

		//Declaring New Books array after Shelfing
		const books = this.state.books
			.filter((book) => book.id !== changedBook.id)
			.concat(changedBook); // I did it by (remove and reconcat the book) to match the API update method's result

		//updating the new Books state locally and globally
		this.setState({books});
		BooksAPI.update(changedBook, event.target.value);
	};

	/** Search-Page methods */

	// Live Update For Search Results
	handleSearchResult = async (query) => {
		// Update query state onChange
		this.setState({query});

		if (query) {
			//to make sure it's not empty or 403

			let searchResult = await BooksAPI.search(query);

			if (searchResult.length > 0) {
				// console.log(searchResult.length)
				// Loop to get the fetched books
				searchResult = searchResult.map((result) => {
					// And another loop to replace the book with custumized one if exists
					this.state.books.map((book) => {
						if (book.id === result.id) {
							result = book;
						}
						return book;
					});
					return result;
				});

				// set Results in a state to play on them locally
				this.setState({searchResult});
			} else {
				this.setState({searchResult: []});
			}
		} else {
			this.setState({searchResult: []});
		}
	};

	// Search-Page Shelfing
	handleSearchShelfing = (event, changedBook) => {
		// Extract the changed book
		changedBook.shelf = event.target.value;

		let newBooks;

		// Check if it exists in the owned Books State, if so remove it and concat it again, if not just concat it
		if (this.state.books.includes(changedBook)) {
			newBooks = this.state.books
				.filter((book) => book.id !== changedBook.id)
				.concat(changedBook);
		} else {
			newBooks = this.state.books.concat(changedBook);
		}
		// Update the new list locally and globally
		this.setState({books: newBooks});
		BooksAPI.update(changedBook, event.target.value);
	};

	// A tiny Function on the Back-Home Button To reset search results and query
	handleBack = () => {
		this.setState({searchResult: []});
		this.setState({query: ""});
	};

	/** King Render */

	render() {
		return (
			<div className='app'>
				{/* switch between the two main pages */}
				<Switch>
					<Route
						path='/search'
						render={(props) => (
							<SearchPage
								{...props}
								query={this.state.query}
								searchResult={this.state.searchResult}
								handleSearchResult={this.handleSearchResult}
								handleShelfing={this.handleSearchShelfing}
								handleBack={this.handleBack}
							/>
						)}
					/>
					<Route
						path='/'
						exact
						render={(props) => (
							<HomePage
								{...props}
								loading={this.state.loading}
								allBooks={this.state.books}
								handleShelfing={this.handleHomeShelfing}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
