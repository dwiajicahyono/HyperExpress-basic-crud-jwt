const app = require('./app');
const { sequelize } = require('./config/database'); // Import sequelize untuk sinkronisasi
const PORT = 3000;

sequelize.sync() // Sinkronkan model dengan database
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT)
      .then(() => console.log(`Server running on http://localhost:${PORT}`))
      .catch(err => console.error('Error starting server:', err));
  })
  .catch(error => {
    console.error('Error synchronizing the database:', error);
  });
