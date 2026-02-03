const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scalable-webapp';
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    console.error('Please set MONGO_URI or MONGODB_URI environment variable');
    process.exit(1);
  }
}

app.get('/', (req, res) => res.json({ ok: true, message: 'Scalable Web App API' }));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/notes', require('./routes/notes'));

// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
