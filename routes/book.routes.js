const router = requires('express').Router();
const Book = requires('../models/Book.model.js');
require("dotenv").config();


//CRUD BOOKS

// Verbo	Endpoint	Valor de retorno	Protegida?
// POST	/book	O objeto de livro criado	Sim
// GET	/book	Uma array com todos os livros da coleção	Não
// GET	/book/:id	Um livro específico, cujo _id seja igual ao parâmetro de rota id	Não
// PATCH	/book/:id	O objeto de livro atualizado	Sim
// DELETE	/book/:id	Um objeto vazio ({})	Sim
// POST	/upload	A url do arquivo armazenado no Cloudinary	Sim

//Create
router.post('/create', async (req, res, next) => {
    const{ tittle, author, synopsis, releaseYear, genre, coverImage } = req.body;

    try {
        const newBook = await Book.create({tittle, author, synopsis, releaseYear, genre, coverImage})
        res.status(201).json(newBook);
    } catch (error) {
        next(error)
        
    }
    
  })

//Patch
router.put('/update/:bookId', async (req, res, next) => {
    const update = req.body;
    const {bookId} = req.params;

    try {
        const updateBook = await Book.findByIdAndUpdate(bookId, update, {new:true})
        res.status(201).json(updateBook)
    } catch (error) {
        next(error)
    }
})

//Delete
router.delete('/delete/:bookId', async (req, res, next) => {
    const {bookId} = req.params;

    try {
        await Book.findByIdAndRemove(bookId)
        res.status(201).json({message: 'Deleted'})
    } catch (error) {
        next(error)
        
    }
})



//Upload Image

  module.exports = router;