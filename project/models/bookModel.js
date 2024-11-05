const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
}, {
  tableName: 'books',
  timestamps: false,
});

module.exports = Book;
