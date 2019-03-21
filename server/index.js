const mongoose = require('mongoose');
const express  = require('express');
const keys     = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(keys.mongoURI)
    .then(
        () => {console.log('Database is connected')},
        err => {console.log(`Error ${err}`)}
    );

app.get('/', (req, res) => {
    res.send('Root')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
