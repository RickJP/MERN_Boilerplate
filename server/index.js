const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./db/db');
require('dotenv').config();

const {User} = require('./models/user.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const { auth } = require('./middleware/auth');

app.get('/api/user/auth', auth, (req, res) => {
  const { _id, email, name, lastName, role } = req.user;

  res.json({
    _id,
    isAuth: true,
    email,
    name,
    lastName,
    role
  })
})

app.get('/', (req, res) => {
  console.log('I have ARRIVED!')
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) return res.json({success: false, error: err});
    return res.json({success: true, data: userData});
  });
});

app.post('/api/user/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({loginSuccess: false, message: 'email not found'});
    }

    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({loginSuccess: false, message: 'wrong password'});
      }
    });
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie('x_auth', user.token).status(200).json({
        loginSuccess: true,
      });
    });
  });
});

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ logoutSuccess: false, err })
    return res.send({
      logoutSuccess: true
    })
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
