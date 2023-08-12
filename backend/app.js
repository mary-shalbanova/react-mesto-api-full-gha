require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const process = require('process');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = process.env;
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin}${err.name} с текстом ${err.message} не обработана`);
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
