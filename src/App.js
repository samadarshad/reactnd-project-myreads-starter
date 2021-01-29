import React, { Component, Fragment } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import OpenSearch from './OpenSearch'
import ListBooks from './ListBooks'

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
          <SearchPage key="search-books" shelves={this.shelves} updateBook={this.updateBook} currentBooks={this.state.books} />
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
