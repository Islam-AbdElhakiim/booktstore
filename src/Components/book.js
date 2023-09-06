import React from "react";

export default function Book(props) {
	// Destructing
	const {handleShelfing, currentBook} = props;

	//Invoking the shelf updater function
	const invokeShelfing = (e, book) => {
		handleShelfing(e, book);
	};
	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					{
						<div
							className='book-cover'
							style={{
								width: 128,
								height: 193,
								backgroundImage: currentBook.imageLinks
									? `url("${
											currentBook.imageLinks["thumbnail"]
									  }")`
									: "https://picsum.photos/id/237/200/300",
							}}
						/>
					}
					<div className='book-shelf-changer'>
						<select
							onChange={(e) => invokeShelfing(e, currentBook)}
							defaultValue={
								currentBook.shelf ? currentBook.shelf : "none"
							}
							id='shelfSelector'
						>
							<option value='move' disabled>
								Move to...
							</option>
							<option
								key='currentlyReading'
								value='currentlyReading'
							>
								Currently Reading
							</option>
							<option key='wantToRead' value='wantToRead'>
								Want to Read
							</option>
							<option key='read' value='read'>
								Read
							</option>
							<option value='none'>None</option>
						</select>
					</div>
				</div>
				<div className='book-title'> {currentBook.title} </div>
				<div className='book-authors'>
					{currentBook.authors
						? currentBook.authors.map((author) => (
								<address key={author}>{author}</address>
						  ))
						: "unknown authors"}
				</div>
			</div>
		</li>
	);
}
