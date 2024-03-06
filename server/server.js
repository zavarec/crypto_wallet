const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const bybitRouter = require('./routes/bybitRouter');
const stockRouter = require('./routesss/stockRouter');

const tokensRouter = require('./routes/tokensRouter');

const apiKeysRouter = require('./routes/apiKeysRouter');
const marketRouter = require('./routesss/marketRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
// const extension = process.env.NODE_ENV === 'production' ? 'js' : 'jsx';
// app.engine(extension, jsxRender);
// app.set('view engine', extension);

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/auth', userRouter);
app.use('/balance', bybitRouter);
app.use('/api/stocks', stockRouter);

app.use('/api/tokens', tokensRouter);

app.use('/api/apikeys', apiKeysRouter);
app.use('/api/marketdata', marketRouter);

app.listen(PORT, () => {
  console.log(`Server is running oncc port ${PORT}`);
});
