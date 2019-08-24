const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');

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
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/imagesearch', require('./routes/api/imagesearch'));
app.use('/api/latest/imagesearch', require('./routes/api/latest'));

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
