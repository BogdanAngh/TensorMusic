var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken')

const keys = require('../config/keys');
const mongoose = require('mongoose');
const Song = mongoose.model('songs');
const User = mongoose.model('users');

/* PROTECTIVE MIDDLEWARE */
router.use((req, res, next) => {
    
    //check header for token
    var token = req.headers['authorization'];
    token = token.replace('Bearer ', '')
    // decode token
    if(token){
        
        jwt.verify(token, keys.jwtSecret, (err, decoded) => {
            if(err){
                return res.json({message: 'invalid token'});
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{ // there is no token in the request
        res.send({
            message: 'No token provided'
        })
    }

})

/* SONG ROUTES */

router.post('/addSong', (req, res) => {
    let songPayload = req.body.songPayload,
        songName    = req.body.name,
        userName    = req.body.userName

    let duplicate = false;
        User.findOne({name: userName})
        .then( user => {
            if(!user){
                res.status(404).send({error: "User not found"});
            }else{
                var songs = user.library;
                
                if(!songs.length){
                    var song = new Song
                        (
                            {
                                songPayload: songPayload,
                                name: songName
                            }
                        )
                    user.library.push(song);
                    user.save();
                    res.send({
                        message: "Song added to library"
                    })
                }else{

                    for(let i = 0; i < songs.length; i++){
                        if(songName == songs[i].name){
                            duplicate = true;
                            res.send({ error: "Song with the same name already exists!" })
                            break;
                        }
                    }

                    if(!duplicate){
                        var song = new Song
                            (
                                {
                                    songPayload: songPayload,
                                    name: songName
                                }
                            )
                        user.library.push(song);
                        user.save();
                        res.send({
                            message: "Song added to library"
                        })
                    }
                    
                }
            }
        })
    
})

router.get('/library', (req, res) => {
    let userName    = req.query.userName;

    User.findOne({name: userName})
        .then(user => {
            if(!user){
                res.status(404).send({error: "User not found"});
            }else{
                var songs = user.library;

                res.send(songs)
            }
        })
})

router.post('/remove', (req, res) => {
    let userName    = req.body.userName,
        songName    = req.body.name

    User.findOne({name: userName})
        .then(user => {
            if(!user){
                res.status(404).send({error: "User not found"});
            }else{
                var songs = user.library;
                var song;
                for(let i = 0; i < songs.length; i++){
                    if(songs[i].name == songName){
                        song = songs[i];
                        break;
                    }
                }

                songs.id(song._id).remove();
                user.save()
                res.send({
                    message: "Song removed from library"
                })
            }
        })
})

router.post('/rename', (req, res) => {
    let userName    = req.body.userName,
        songName    = req.body.name,
        newName     = req.body.newName

    User.findOne({name: userName})
        .then(user => {
            if(!user){
                res.status(404).send({error: "User not found"});
            }else{
                var songs = user.library;
                var song;
                for(let i = 0; i < songs.length; i++){
                    if(songs[i].name == songName){
                        songs[i].name = newName
                        break;
                    }
                }

                user.save()
                res.send({
                    message: "Song renamed"
                })
            }
        })
})

module.exports = router;