import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';

dotenv.config();
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Page not Found' });
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _, res, _next) => {
  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ name: err.name, message: err.message });
});

export default app;
