const express = require('express');
const BookModel = require('../models/Book');
const UserModel = require('../models/User');
const router = express.Router();

router.post('/create-book/', (req, res) => {
    BookModel.create({
        name: req.body.name,
        summary: req.body.summary,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }).then(result => {
        return res.json(result);
    }).catch(err => console.log(err));
})

router.get('/books', (req, res) => {
    BookModel.find().then(books => {
        return res.json(books);
    }).catch(err => console.log(err));
})

router.get('/book-by-id/:id', (req, res) => {
    const id = req.params.id;
    BookModel.findById({_id: id})
    .then(result => {
        return res.json(result);
    }).catch(err => res.json(err))
})

router.get('/saved-books/:id' , (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id: id})
    .then(result => {
        console.log(result);
        return res.json({savedBooks: result.savedBooks})
    })
    .catch(err => res.status(500).json(err))
})

router.put('/edit-book/:id', async (req, res) => {
    const id = req.params.id;
    const { name, summary, author, imageUrl } = req.body;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(
            id,
            { name, summary, author, imageUrl },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.json(updatedBook);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to update Book', details: err });
    }
});


router.delete('/delete-book/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete Book', details: err });
    }
});


router.get('/user-books/:id' , async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById({_id: id});
        
        const books = await BookModel.find({
            _id: {$in: user.savedBooks}
        })
        console.log(books)
        res.status(201).json(books);
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.put('/', async (req, res) => {
    const book = await BookModel.findById({_id: req.body.bookId});
    const user = await UserModel.findById({_id: req.body.userId});
    try{
        user.savedBook.push(book._id)
        await user.save()
        return res.json({savedBook: user.savedBooks})
    }
    catch(err){
        return res.json(err)
    }
})

module.exports = router;