const { Sequelize } = require('sequelize');
//  atur koneksi mysql kalian disini
// 'database_name', 'username', 'password',
const sequelize = new Sequelize('hyperexpress', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
