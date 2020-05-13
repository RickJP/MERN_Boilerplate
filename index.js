const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
require('./db/db')
require('dotenv').config();


const { User } = require('./models/user.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', () => {
  console.log('I am here!')
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userData) => {
    if (err) return res.json({ success: false, error: err })
    res.status(200).json({ success: true })
  })
  
})


app.listen(port, () => console.log(`Listening on port ${port}`));