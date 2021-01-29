import React, { Component, Fragment } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom'

class SearchBooksResult extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { books } = this.props;

    return (

      <div className="search-books-results">
        <BookShelfBooks books={books} />
      </div>
    )
  }
}

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

class SearchPage extends Component {
  state = {
    books: []
  }

  setBooks = (results) => {
    console.log(results)
    this.setState({
      books: (results === undefined || 'error' in results) ? [] : results
    })
  }
  render() {
    return (
      <div className="search-books">
        <SearchBooksBar key="search-books-bar" setBooks={this.setBooks} />
        <SearchBooksResult key="search-books-results" books={this.state.books} />
      </div>
    )
  }
}


class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { title, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookShelfBooks books={books} />
      </div>
    )
  }
}

class BookShelfBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} />
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${('imageLinks' in book && 'thumbnail' in book.imageLinks && book.imageLinks.thumbnail !== undefined ? book.imageLinks.thumbnail : '')})` }} ></div>
          <BookShelfChanger />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div >
    )
  }
}

class BookShelfChanger extends Component { //TODO make this list generated from object
  render() {
    return (
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

class OpenSearch extends Component {
  render() {
    return (
      <div className="open-search">
        <Link
          to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    )
  }
}

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  shelfIdToTitle = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read"
  }

  render() {
    const { books } = this.props;
    const booksByShelf = groupBy(books, "shelf");
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              Object.entries(booksByShelf).map(([shelfId, books]) => <BookShelf key={shelfId} title={this.shelfIdToTitle[shelfId]} books={books} />)
            }

          </div>
        </div>
      </div>
    )
  }
}

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    console.log("booksapp")
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchPage key="search-books" />
        )}
        />
        <Route exact path='/' render={() => (
          <Fragment>
            <ListBooks books={this.state.books} />
            <OpenSearch />
          </Fragment>
        )}
        />


      </div>
    )
  }
}

export default BooksApp
