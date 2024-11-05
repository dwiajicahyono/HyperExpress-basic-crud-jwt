const Book = require('../models/bookModel');
const { sequelize } = require('../config/database');

const addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const book = await Book.create({ title, author, description });
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
};

const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// const updateBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, author, description } = req.body;

//     const book = await Book.findByPk(id);
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     await book.update({ title, author, description });
//     res.status(200).json({ message: 'Book updated successfully', book });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating book', error });
//   }
// };
const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, description } = req.body;
  
      const [result] = await sequelize.query(
        'UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?',
        {
          replacements: [title, author, description, id],
        }
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating book', error });
    }
  };

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

module.exports = { addBook, listBooks, updateBook, deleteBook };
