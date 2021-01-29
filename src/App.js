import React, { Component, Fragment } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom'

class SearchBooksResult extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    shelves: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  };

  render() {
    const { books, shelves, updateBook } = this.props;

    return (

      <div className="search-books-results">
        <BookShelfBooks books={books} shelves={shelves} updateBook={updateBook} />
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
  static propTypes = {
    shelves: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
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
    const { shelves, updateBook } = this.props;
    return (
      <div className="search-books">
        <SearchBooksBar key="search-books-bar" setBooks={this.setBooks} />
        <SearchBooksResult key="search-books-results" books={this.state.books} shelves={shelves} updateBook={updateBook} />
      </div>
    )
  }
}


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

class BookShelfBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    shelves: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  };

  render() {
    const { books, shelves, updateBook } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} shelves={shelves} updateBook={updateBook} />
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

class BookShelfChanger extends Component {
  static propTypes = {
    shelves: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired,
    currentShelf: PropTypes.string
  };

  render() {
    const { shelves, selectShelf, currentShelf } = this.props;
    const defaultValue = currentShelf ? currentShelf : 'move'
    return (
      <div className="book-shelf-changer">
        <select id="book-shelf-changer-id" onChange={(e) => selectShelf(e.target.value)} defaultValue={defaultValue}>
          <option value="move" disabled>Move to...</option>
          {
            Object.entries(shelves).map(([shelfId, shelfName]) => <option key={shelfId} value={shelfId}>{shelfName}</option>)
          }
          <option value="none">None</option>
        </select>
      </div >
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

class BooksApp extends Component {
  state = {
    books: []
  }

  shelves = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read"
  }

  refresh = () => {
    BooksAPI.getAll()
      .then((results) => {
        this.setState({ books: results })
      })
  }

  componentDidMount() {
    this.refresh()
  }

  updateBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId)
      .then(this.refresh)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchPage key="search-books" shelves={this.shelves} updateBook={this.updateBook} />
        )}
        />
        <Route exact path='/' render={() => (
          <Fragment>
            <ListBooks books={this.state.books} shelves={this.shelves} updateBook={this.updateBook} />
            <OpenSearch />
          </Fragment>
        )}
        />


      </div>
    )
  }
}

export default BooksApp
