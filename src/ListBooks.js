import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types';
import { groupBy } from './utils'
import BookShelf from './BookShelf'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.arrayOf(PropTypes.object).isRequired,
        shelves: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    render() {
        const { books, shelves, updateBook } = this.props;
        const booksByShelf = groupBy(books, "shelf");
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            Object.entries(booksByShelf).map(([shelfId, books]) => <BookShelf key={shelfId} title={shelves[shelfId]} books={books} shelves={shelves} updateBook={updateBook} />)
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks