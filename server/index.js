require('./models/Song')
require('./models/User')

const mongoose   = require('mongoose');
const express    = require('express');
const bodyParser = require('body-parser');
const passport   = require('passport');

const keys          = require('./config/keys');
const users         = require('./routes/authRoute');
const serviceRoute  = require('./routes/serviceRoutes');
const app = express();


app.use(passport.initialize());
require('./services/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/songs', serviceRoute);

app.get('/', function(req, res) {
    res.send('ROOT');
})

// port for dev or prod 
const PORT = process.env.PORT || 5000;

// establish connection to mongoDB
mongoose.connect(keys.mongoURI)
    .then(
        () => {console.log('Database is connected')},
        err => {console.log(`Error ${err}`)}
    );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
