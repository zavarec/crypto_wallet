const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`Server is running oncc port ${PORT}`);
});
