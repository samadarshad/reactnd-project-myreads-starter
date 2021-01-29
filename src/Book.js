import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelves: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    selectShelf = (shelfId) => {
        this.props.updateBook(this.props.book, shelfId)
    }

    render() {
        const { book, shelves } = this.props;
        const bookCurrentShelf = book.shelf ? book.shelf : ''
        const bookthumbnail = ('imageLinks' in book && 'thumbnail' in book.imageLinks && book.imageLinks.thumbnail !== undefined ? book.imageLinks.thumbnail : '')
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${bookthumbnail})` }} ></div>
                    <BookShelfChanger shelves={shelves} selectShelf={this.selectShelf} currentShelf={bookCurrentShelf} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div >
        )
    }
}

export default Book