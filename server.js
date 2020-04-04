const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

app.use(helmet());

// Body parser
app.use(express.json());

// Connect to Mongo
const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use('/api/imagesearch', require('./routes/api/imagesearch'));
app.use('/api/latest/imagesearch', require('./routes/api/latest'));

// Serve static build folder if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function stop() {
  mongoose.connection.close();
  server.close();
}

// For testing
module.exports = app;
module.exports.stop = stop;
