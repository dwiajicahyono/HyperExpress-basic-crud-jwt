const HyperExpress = require('hyper-express');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = new HyperExpress.Server();

connectDB();

// Middleware untuk parsing JSON
app.use((req, res, next) => {
  req.json().then((data) => {
    req.body = data;
    next();
  });
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;
