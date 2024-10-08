import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SavedBook() {
  const [savedBooks, setSavedBooks] = useState([])
  const userId = window.localStorage.getItem('id')
  useEffect(() => {
    axios.get('http://localhost:3001/book/user-books/'+userId)
     .then(books => {
        setSavedBooks(books.data)
     }).catch(err => console.log(err))
  }, [])
  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h2>Favourite Books</h2>
        {
          savedBooks.map(book => (
            <div key={book._id} className='mt-4 p-3 border'>
              <Link to={`/read-book/${book._id}`} className='text-decoration-none'>
                <h3>{book.name}</h3>
              </Link>
              <img src={book.imageUrl} alt="Book" style={{width:600, height:400}} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SavedBook