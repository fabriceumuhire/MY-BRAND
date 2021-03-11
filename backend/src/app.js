import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import server from './server';

// import routes from './routes/index.js';

dotenv.config();
const app = express();
const { PORT } = process.env;
server();

/**
 * Middleware
 */
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// catch 400
app.use((err, req, res, next) => {
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  res.status(500).send(`Error: ${err}`);
  next();
});

/**
 * Register the routes
 */

app.use('/api/v1', routes);

app.listen(
  PORT,
  console.log(`Server started at http://localhost:${PORT}/api`),
);

export default app;
