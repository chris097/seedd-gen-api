const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

const mongoose = require('mongoose');
const notes = require('./routes/note');
const users = require('./routes/user');

//session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const { MONGODB_URL } = process.env;

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: "mySessions"
});

// Catch error
store.on('error', function (err) {
    console.log(err)
})

app.use(express.json())
app.use(session({
    secret: 'This is my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use('/api/v1', notes)
app.use('/api/v1', users)


const port = process.env.PORT || 5400;

app.get('/', (req, res) => {
    res.send('General Note.')
});

mongoose.connect(MONGODB_URL,{
    usenewurlparser: true,
    useunifiedtopology: true,
  })
    .then(() => {
        app.listen(port, () => console.log('listening to port ' + port))
    })
    .catch(err => console.log(err.message))