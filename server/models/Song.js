const mongoose     = require('mongoose');
const { Schema }   = mongoose;

const songSchema = new Schema({
    songPayload: String,
    name: String,
    tempo: String
});

mongoose.model('songs', songSchema);