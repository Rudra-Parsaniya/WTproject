import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
    const { id } = useParams();
    const [book, setBook] = useState({
        name: '',
        summary: '',
        author: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/book/book-by-id/${id}`);
                setBook(result.data || {}); 
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book');
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/book/edit-book/${id}`, book);
            alert('Book updated successfully');
            navigate(`/read-book/${id}`);
        } catch (err) {
            console.error('Failed to update book:', err);
            setError('Failed to update book');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-3 border border-1 w-25'>
            <h3>Edit Book</h3>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label htmlFor="name">Book Name</label>
                    <input
                    type="text"
                    placeholder='Enter Book Name'
                    className='form-control'
                    name='name'
                    value={book.name || ''} 
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
                    value={book.summary || ''}
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
                    value={book.author || ''}
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
                    value={book.imageUrl || ''}
                    onChange={handleChange}
                  />
                </div>
                <button className='mt-1 btn btn-success w-100'>Update Book</button>
            </form>
        </div>
    </div>  
    );
}

export default EditBook;
