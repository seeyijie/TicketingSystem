const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./routes/api/auth');
const tickets = require('./routes/api/tickets')
const admin = require('./routes/api/admin')
const passport = require('passport');
const cors = require('cors');

const port = process.env.PORT || 8080;


// Config DB
const db = require('./config/keys').dev.mongoURI;


// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Passport config
require('./config/passport')(passport);

// Connect to MongoDB via Mongoose
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/auth', auth);
app.use('/api/tickets', tickets);
app.use('/api/admin', admin)

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
