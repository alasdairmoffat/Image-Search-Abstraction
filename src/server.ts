import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import imageSearch from './routes/api/imagesearch';
import latest from './routes/api/latest';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Connect to Mongo
const db = process.env.MONGO_URI || '';

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use('/api/imagesearch', imageSearch);
app.use('/api/latest/imagesearch', latest);

// Serve static build folder if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export function stop() {
  mongoose.connection.close();
  server.close();
}

// For testing
export default app;
