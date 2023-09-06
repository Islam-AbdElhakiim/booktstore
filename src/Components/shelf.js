import React from 'react'
import Book from './book'

export default function Shelf(props) {
    // Destructing
    const { shelfName, allBooks, handleShelfing} = props

    // Determine books of every shelf
    const shelfBooks = allBooks.filter( book => book.shelf === shelfName )

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        shelfBooks.map( currentBook => (
                            <Book
                                key = { currentBook.id }
                                currentBook = { currentBook }
                                shelfName={ shelfName }
                                allBooks={ allBooks }
                                handleShelfing = { handleShelfing }
                            />
                        ))
                    }

                </ol>
            </div>
        </div>
    )
}

