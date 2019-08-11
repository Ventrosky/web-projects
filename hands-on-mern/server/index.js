const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import users from './mocks/users';
import logger from './middleware/logger';
import withAuthentication from './middleware/withAuthentication';
import db from './db/index';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const port = process.env.PORT || 8055;

app.use(withAuthentication);
app.use(logger);

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/v1/users',usersRouter);

app.use('/v1/products',productsRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));