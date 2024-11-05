const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { secret, expiresIn } = require('../config/jwtConfig');

const register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Coba membuat pengguna baru
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Jika error adalah SequelizeUniqueConstraintError, berarti username sudah ada
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ message: 'Username sudah terdaftar. Silakan gunakan username lain.' });
      } else {
        // Tangani error lainnya
        res.status(500).json({ message: 'Error registering user', error });
      }
    }
  };

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { register, login };
