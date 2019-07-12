const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use('/api/imagesearch', require('./routes/api/imagesearch'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

// For testing
module.exports = app;
