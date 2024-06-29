const express = require('express');
const mongoose = require('mongoose');
const groupRoutes = require('./routes/groupRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/groups', groupRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
