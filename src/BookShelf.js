import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookShelfBooks from './BookShelfBooks'

class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.arrayOf(PropTypes.object).isRequired,
        shelves: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    render() {
        const { title, books, shelves, updateBook } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <BookShelfBooks books={books} shelves={shelves} updateBook={updateBook} />
            </div>
        )
    }
}

export default BookShelf