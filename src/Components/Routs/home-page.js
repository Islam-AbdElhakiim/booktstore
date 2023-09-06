import React from 'react';
import Shelf from '../shelf'
import SearchBtn from '../search-btn'


export default function HomePage (props) {
        // Destructing
        const { loading, allBooks, handleShelfing } = props

        // Assign an array of shelves - as they are just 3 -
        let shelvesArray = ['currentlyReading', 'wantToRead', 'read']
        return (
            <div>
                {
                    loading || !allBooks ? <div className="loader"></div> : (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div >
                            <div className="list-books-content">
                                <div>
                                    {
                                        shelvesArray.map(shelfName =>
                                            <Shelf
                                                key = { shelfName }
                                                shelfName={shelfName}
                                                allBooks={allBooks}
                                                handleShelfing = {handleShelfing}
                                            />
                                        )}
                                </div>
                            </div>
                            <SearchBtn />
                        </div>
                    )
                }
            </div>
        )
}
