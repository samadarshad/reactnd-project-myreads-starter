import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
    static propTypes = {
        shelves: PropTypes.object.isRequired,
        selectShelf: PropTypes.func.isRequired,
        currentShelf: PropTypes.string
    };

    render() {
        const { shelves, selectShelf, currentShelf } = this.props;
        const defaultValue = currentShelf ? currentShelf : 'none'
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

export default BookShelfChanger