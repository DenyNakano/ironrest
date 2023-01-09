const router = requires('express').Router();
const Book = requires('../models/Book.model.js');
require("dotenv").config();

//All Books
router.get('/all', async (req, res, next) => {

    try{
        const books = await Book.find()
        res.status(201).json(books)
    } catch (error) {
        next(error)
    }
})

//Single Book
router.get('/single', async (req, res, next) => {

    try {
        const { bookName } = req.body
        const searchBook = await Book.findOne({ bookName })
        res.status(201).json(searchBook)

    } catch (error) {
        next(error)
    }
})