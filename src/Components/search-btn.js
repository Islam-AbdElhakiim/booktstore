import React from 'react';
import { Link } from 'react-router-dom'

export default function SearchBtn() {
    return (
        <div className="open-search">
            <Link className="cursor" to="/search"><button>Add a book</button></Link>
        </div>
    )
}
