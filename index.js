const express = require('express');
require('./db/db')
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/', () => {
  console.log('I am here!')
})

app.listen(port);