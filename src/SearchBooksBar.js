import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class SearchBooksBar extends Component {
    static propTypes = {
        setBooks: PropTypes.func.isRequired
    };

    state = {
        query: ''
    }

    componentDidUpdate(_, prevState) {
        const { setBooks } = this.props
        if (this.state.query !== prevState.query) {
            BooksAPI.search(this.state.query)
                .then((results) => {
                    setBooks(results)
                })
        }

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div className="search-books-bar">
                <Link
                    to='/'>
                    <button className="close-search">Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        name="query"
                        value={this.state.query}
                        placeholder="Search by title or author"
                        onChange={this.handleChange} />

                </div>
            </div>
        )
    }
}

export default SearchBooksBar