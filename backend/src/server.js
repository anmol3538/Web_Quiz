const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


const connectDB = require('./config/database');
connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors());


app.use('/api/auth', require('./routes/auth'));


app.get('/', (req, res) => {
  res.json({
    message: 'Authentication API is running!',
    version: '1.0.0'
  });
});


app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});