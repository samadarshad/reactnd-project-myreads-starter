import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from './Book'

class BookShelfBooks extends Component {
    static propTypes = {
        books: PropTypes.arrayOf(PropTypes.object).isRequired,
        shelves: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired,
        currentBooks: PropTypes.arrayOf(PropTypes.object)
    };

    render() {
        const { books, shelves, updateBook, currentBooks } = this.props;

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => {
                        let bookDisplay = book
                        const matchingBook = (currentBooks ? currentBooks.filter((currentBook) => (currentBook.id === bookDisplay.id))[0] : undefined)
                        if (matchingBook !== undefined) {
                            bookDisplay.shelf = matchingBook.shelf
                        }
                        return (
                            <li key={bookDisplay.id}>
                                <Book book={bookDisplay} shelves={shelves} updateBook={updateBook} />
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

export default BookShelfBooks