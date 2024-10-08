import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateBook() {
  const [book, setBook] = useState({
    name: '',
    summary: '',
    author: '',
    imageUrl: '',
    userId: window.localStorage.getItem('id')
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setBook({...book, [name]: value })
  }
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/book/create-book', book)
    .then(result => {
      navigate('/')
      console.log(result.data)
      alert('book created')
    }).catch(err => console.error(err))
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-3 border border-1 w-25'>
            <h3>Create Book</h3>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label htmlFor="name">Book Name</label>
                    <input
                    type="text"
                    placeholder='Enter Book Name'
                    className='form-control'
                    name='name'
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                    <label htmlFor="desc">Summary</label>
                    <input
                    type="text"
                    placeholder='Enter Summary'
                    className='form-control'
                    name='summary'
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                    <label htmlFor="ingr">Author</label>
                    <input
                    type="text"
                    placeholder='Enter Author Name'
                    className='form-control'
                    name='author'
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                    <label htmlFor="iamgeUrl">Image URL</label>
                    <input
                    type="text"
                    placeholder='Enter URL'
                    className='form-control'
                    name='imageUrl'
                    onChange={handleChange}
                  />
                </div>
                <button className='mt-1 btn btn-success w-100'>Submit</button>
            </form>
        </div>
    </div>  
  )
}

export default CreateBook