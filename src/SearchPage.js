import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SearchBooksBar from './SearchBooksBar'
import BookShelfBooks from './BookShelfBooks'

class SearchPage extends Component {
    static propTypes = {
        shelves: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired,
        currentBooks: PropTypes.arrayOf(PropTypes.object)
    };

    state = {
        books: []
    }

    setBooks = (results) => {
        this.setState({
            books: (results === undefined || 'error' in results) ? [] : results
        })
    }
    render() {
        const { shelves, updateBook, currentBooks } = this.props;
        return (
            <div className="search-books">
                <SearchBooksBar key="search-books-bar" setBooks={this.setBooks} />

                <div className="search-books-results">
                    <BookShelfBooks books={this.state.books} shelves={shelves} updateBook={updateBook} currentBooks={currentBooks} />
                </div>
            </div>
        )
    }
}

export default SearchPage