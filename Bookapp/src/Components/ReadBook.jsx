import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReadBook() {
    const { id } = useParams();
    const userId = window.localStorage.getItem('id');
    const [book, setBook] = useState({});
    const [savedBooks, setSavedBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getBook = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/book/book-by-id/${id}`);
                setBook(result.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book');
            }
        };

        const fetchSavedBooks = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/book/saved-books/${userId}`);
                setSavedBooks(result.data || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch saved books');
            }
        };

        fetchSavedBooks();
        getBook();
    }, [id, userId]);

    const savedBook = async (bookId) => {
        try {
            const result = await axios.put('http://localhost:3001/book', { userId, bookId });
            setSavedBooks(result.data.savedBooks || []);
        } catch (err) {
            console.error(err);
            setError('Failed to save book');
        }
    };

    const deleteBook = async () => {
        try {
            await axios.delete(`http://localhost:3001/book/delete-book/${book._id}`);
            alert('book deleted successfully');
        } catch (err) {
            console.error('Failed to delete book:', err);
            setError('Failed to delete book');
        }
    };
    

    const isBookSaved = (bookId) => Array.isArray(savedBooks) && savedBooks.includes(bookId);

    return (
        <div className='d-flex justify-content-center container mt-3'>
            <div className='p-2'>
                <img src={book.imageUrl} alt={book.name} style={{ width: 600, height: 400 }} />
            </div>
            <div className='p-2'>
                <h2>{book.name}</h2>
                <button
                    className='btn btn-warning me-2'
                    onClick={() => savedBook(book._id)}
                    disabled={isBookSaved(book._id)}
                >
                    {isBookSaved(book._id) ? 'Added' : 'Add to favorites'}
                </button>
                <button
                    className='btn btn-primary me-2'
                    onClick={() => navigate(`/book/edit/${book._id}`)}
                >
                    Edit
                </button>
                <button
                    className='btn btn-danger'
                    onClick={deleteBook}
                >
                    Delete
                </button>
                <h3>Author</h3>
                <p>{book.author}</p>
                <h3>Summary</h3>
                <p>{book.summary}</p>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
}

export default ReadBook;
